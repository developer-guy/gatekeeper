package externaldata

import (
	"fmt"
	"sync"

	"github.com/open-policy-agent/frameworks/constraint/pkg/apis/externaldata/v1alpha1"
	"github.com/open-policy-agent/gatekeeper/pkg/logging"
	logf "sigs.k8s.io/controller-runtime/pkg/log"
)

var (
	log = logf.Log.WithName("controller").WithValues(logging.Process, "externaldata_controller")
)

type ProviderCache struct {
	Cache map[string]v1alpha1.Provider
	mux   sync.RWMutex
}

func NewCache() *ProviderCache {
	return &ProviderCache{
		Cache: make(map[string]v1alpha1.Provider),
	}
}

func (c *ProviderCache) Get(key string) (v1alpha1.Provider, error) {
	log.Info("***", "cache", c.Cache)
	if v, ok := c.Cache[key]; ok {
		return v, nil
	}
	return v1alpha1.Provider{}, fmt.Errorf("key is not found in cache")
}

func (c *ProviderCache) Upsert(provider *v1alpha1.Provider) error {
	c.mux.Lock()
	defer c.mux.Unlock()

	c.Cache[provider.GetName()] = v1alpha1.Provider{
		Spec: v1alpha1.ProviderSpec{
			ProxyURL:      provider.Spec.ProxyURL,
			FailurePolicy: provider.Spec.FailurePolicy,
			Timeout:       provider.Spec.Timeout,
			MaxRetry:      provider.Spec.MaxRetry,
		},
	}

	return nil
}

func (c *ProviderCache) Remove(name string) error {
	c.mux.Lock()
	defer c.mux.Unlock()

	delete(c.Cache, name)

	return nil
}
