/*

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package clients

import (
	"context"
	"time"

	"k8s.io/apimachinery/pkg/api/meta"
	"sigs.k8s.io/controller-runtime/pkg/client"
)

// RetryClient wraps a client to provide rate-limiter respecting retry behavior.
type RetryClient struct {
	client.Client
}

type ErrRateLimited struct {
	// Duration to wait until the next API call can be made.
	Delay time.Duration
}

// retry will run the provided function, retrying if it fails due to rate limiting.
// It will respect the rate limiters delay guidance. If context is cancelled, it will
// return early.
func retry(ctx context.Context, f func() error) error {
	for {
		if err := ctx.Err(); err != nil {
			return err
		}
		err := f()

		if meta.IsNoMatchError(err) {
			select {
			case <-ctx.Done():
				return ctx.Err()
			case <-time.After(5): //TODO: retrieve delay
				continue
			}
		}
		return err
	}
}

func (c *RetryClient) Get(ctx context.Context, key client.ObjectKey, obj client.Object) error {
	return retry(ctx, func() error {
		return c.Client.Get(ctx, key, obj)
	})
}

func (c *RetryClient) List(ctx context.Context, list client.ObjectList, opts ...client.ListOption) error {
	return retry(ctx, func() error {
		return c.Client.List(ctx, list, opts...)
	})
}

func (c *RetryClient) Create(ctx context.Context, obj client.Object, opts ...client.CreateOption) error {
	return retry(ctx, func() error {
		return c.Client.Create(ctx, obj, opts...)
	})
}

func (c *RetryClient) Delete(ctx context.Context, obj client.Object, opts ...client.DeleteOption) error {
	return retry(ctx, func() error {
		return c.Client.Delete(ctx, obj, opts...)
	})
}

func (c *RetryClient) Update(ctx context.Context, obj client.Object, opts ...client.UpdateOption) error {
	return retry(ctx, func() error {
		return c.Client.Update(ctx, obj, opts...)
	})
}

func (c *RetryClient) Patch(ctx context.Context, obj client.Object, patch client.Patch, opts ...client.PatchOption) error {
	return retry(ctx, func() error {
		return c.Client.Patch(ctx, obj, patch, opts...)
	})
}

func (c *RetryClient) DeleteAllOf(ctx context.Context, obj client.Object, opts ...client.DeleteAllOfOption) error {
	return retry(ctx, func() error {
		return c.Client.DeleteAllOf(ctx, obj, opts...)
	})
}

func (c *RetryClient) Status() client.StatusWriter {
	return &RetryStatusWriter{c.Client.Status()}
}

type RetryStatusWriter struct {
	client.StatusWriter
}

func (c *RetryStatusWriter) Update(ctx context.Context, obj client.Object, opts ...client.UpdateOption) error {
	return retry(ctx, func() error {
		return c.StatusWriter.Update(ctx, obj, opts...)
	})
}

func (c *RetryStatusWriter) Patch(ctx context.Context, obj client.Object, patch client.Patch, opts ...client.PatchOption) error {
	return retry(ctx, func() error {
		return c.StatusWriter.Patch(ctx, obj, patch, opts...)
	})
}
