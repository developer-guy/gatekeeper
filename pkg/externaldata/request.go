package externaldata

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"time"

	externaldatav1alpha1 "github.com/open-policy-agent/frameworks/constraint/pkg/apis/externaldata/v1alpha1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
)

// admissionReq *admissionv1.AdmissionRequest
func SendProviderRequest(provider externaldatav1alpha1.Provider, obj *unstructured.Unstructured) (string, error) {
	out, err := json.Marshal(obj)
	if err != nil {
		return "", err
	}
	req, err := http.NewRequest("GET", provider.Spec.ProxyURL, bytes.NewBuffer(out))
	if err != nil {
		return "", err
	}
	req.Header.Set("Content-Type", "application/json")

	timeout := time.Second * time.Duration(provider.Spec.Timeout)
	client := &http.Client{Timeout: timeout}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	var body []byte
	if resp.StatusCode == 200 {
		body, err = ioutil.ReadAll(resp.Body)
		log.Info("*** BODY", "body", string(body))
		if err != nil {
			log.Error(err, "unable to read response body")
			return "", err
		}
	}

	return string(body), nil
}
