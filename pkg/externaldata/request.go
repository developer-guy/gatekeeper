package externaldata

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"time"

	externaldatav1alpha1 "github.com/open-policy-agent/frameworks/constraint/pkg/apis/externaldata/v1alpha1"
)

func SendProviderRequest(provider *externaldatav1alpha1.Provider, source interface{}) (map[string]interface{}, error) {
	out, err := json.Marshal(source)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest("GET", provider.Spec.ProxyURL, bytes.NewBuffer(out))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")
	timeout := time.Second * time.Duration(provider.Spec.Timeout)
	client := &http.Client{Timeout: timeout}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var body []byte
	if resp.StatusCode == 200 {
		body, err = ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Error(err, "unable to read response body")
			return nil, err
		}
	}

	var result map[string]interface{}
	err = json.Unmarshal(body, &result)
	if err != nil {
		return nil, err
	}
	log.Info("***", "result", result)

	return result, nil
}
