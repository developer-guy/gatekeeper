package externaldata

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"time"

	"github.com/hashicorp/go-retryablehttp"
	externaldatav1alpha1 "github.com/open-policy-agent/frameworks/constraint/pkg/apis/externaldata/v1alpha1"
)

func SendProviderRequest(provider *externaldatav1alpha1.Provider, source interface{}) (map[string]interface{}, error) {
	out, err := json.Marshal(source)
	if err != nil {
		return nil, err
	}

	retryClient := retryablehttp.NewClient()
	retryClient.Logger = nil
	retryClient.RetryMax = provider.Spec.MaxRetry
	retryClient.HTTPClient.Timeout = time.Second * time.Duration(provider.Spec.Timeout)

	req, err := retryablehttp.NewRequest("GET", provider.Spec.ProxyURL, bytes.NewBuffer(out))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := retryClient.Do(req)
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

	return result, nil
}
