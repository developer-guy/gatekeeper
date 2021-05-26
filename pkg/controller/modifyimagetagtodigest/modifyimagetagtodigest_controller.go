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

package modifyimagetagtodigest

import (
	"context"
	"fmt"

	opa "github.com/open-policy-agent/frameworks/constraint/pkg/client"
	"github.com/open-policy-agent/frameworks/constraint/pkg/externaldata"
	mutationsv1alpha1 "github.com/open-policy-agent/gatekeeper/apis/mutations/v1alpha1"
	statusv1beta1 "github.com/open-policy-agent/gatekeeper/apis/status/v1beta1"
	"github.com/open-policy-agent/gatekeeper/pkg/controller/mutatorstatus"
	"github.com/open-policy-agent/gatekeeper/pkg/logging"
	"github.com/open-policy-agent/gatekeeper/pkg/mutation"
	"github.com/open-policy-agent/gatekeeper/pkg/mutation/mutators"
	"github.com/open-policy-agent/gatekeeper/pkg/mutation/types"
	"github.com/open-policy-agent/gatekeeper/pkg/readiness"
	"github.com/open-policy-agent/gatekeeper/pkg/util"
	"github.com/open-policy-agent/gatekeeper/pkg/watch"
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/runtime/schema"
	apiTypes "k8s.io/apimachinery/pkg/types"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/controller"
	"sigs.k8s.io/controller-runtime/pkg/handler"
	logf "sigs.k8s.io/controller-runtime/pkg/log"
	"sigs.k8s.io/controller-runtime/pkg/manager"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"
	"sigs.k8s.io/controller-runtime/pkg/source"
)

var (
	log = logf.Log.WithName("controller").WithValues(logging.Process, "modifyimagetagtodigest_controller")
)

var gvkModifyImageTagToDigest = schema.GroupVersionKind{
	Group:   mutationsv1alpha1.GroupVersion.Group,
	Version: mutationsv1alpha1.GroupVersion.Version,
	Kind:    "ModifyImageTagToDigest",
}

type Adder struct {
	MutationCache *mutation.System
	ProviderCache *externaldata.ProviderCache
	Tracker       *readiness.Tracker
	GetPod        func() (*corev1.Pod, error)
}

// Add creates a new ModifyImageTagToDigest Controller and adds it to the Manager. The Manager will set fields on the Controller
// and Start it when the Manager is Started.
func (a *Adder) Add(mgr manager.Manager) error {
	r := newReconciler(mgr, a.MutationCache, a.ProviderCache, a.Tracker, a.GetPod)
	return add(mgr, r)
}

func (a *Adder) InjectOpa(o *opa.Client) {}

func (a *Adder) InjectWatchManager(w *watch.Manager) {}

func (a *Adder) InjectControllerSwitch(cs *watch.ControllerSwitch) {}

func (a *Adder) InjectTracker(t *readiness.Tracker) {
	a.Tracker = t
}

func (a *Adder) InjectGetPod(getPod func() (*corev1.Pod, error)) {
	a.GetPod = getPod
}

func (a *Adder) InjectMutationCache(mutationCache *mutation.System) {
	a.MutationCache = mutationCache
}

func (a *Adder) InjectProviderCache(providerCache *externaldata.ProviderCache) {
	a.ProviderCache = providerCache
}

// newReconciler returns a new reconcile.Reconciler

func newReconciler(mgr manager.Manager, mutationCache *mutation.System, providerCache *externaldata.ProviderCache, tracker *readiness.Tracker, getPod func() (*corev1.Pod, error)) *Reconciler {
	r := &Reconciler{
		system:        mutationCache,
		Client:        mgr.GetClient(),
		tracker:       tracker,
		getPod:        getPod,
		scheme:        mgr.GetScheme(),
		providerCache: providerCache,
	}
	if getPod == nil {
		r.getPod = r.defaultGetPod
	}
	return r
}

// add adds a new Controller to mgr with r as the reconcile.Reconciler
func add(mgr manager.Manager, r reconcile.Reconciler) error {
	if !*mutation.MutationEnabled {
		return nil
	}

	// Create a new controller
	c, err := controller.New("modifyimagetagtodigest-controller", mgr, controller.Options{Reconciler: r})
	if err != nil {
		return err
	}

	// Watch for changes to ModifyImageTagToDigest
	if err = c.Watch(
		&source.Kind{Type: &mutationsv1alpha1.ModifyImageTagToDigest{}},
		&handler.EnqueueRequestForObject{}); err != nil {
		return err
	}

	// Watch for changes to MutatorPodStatus
	err = c.Watch(
		&source.Kind{Type: &statusv1beta1.MutatorPodStatus{}},
		handler.EnqueueRequestsFromMapFunc(mutatorstatus.PodStatusToMutatorMapper(true, "ModifyImageTagToDigest", util.EventPackerMapFunc())),
	)
	if err != nil {
		return err
	}
	return nil
}

// Reconciler reconciles a ModifyImageTagToDigest object
type Reconciler struct {
	client.Client
	system        *mutation.System
	tracker       *readiness.Tracker
	getPod        func() (*corev1.Pod, error)
	scheme        *runtime.Scheme
	providerCache *externaldata.ProviderCache
}

// +kubebuilder:rbac:groups=mutations.gatekeeper.sh,resources=*,verbs=get;list;watch;create;update;patch;delete

// Reconcile reads that state of the cluster for a ModifyImageTagToDigest object and makes changes based on the state read
// and what is in the ModifyImageTagToDigest.Spec
func (r *Reconciler) Reconcile(ctx context.Context, request reconcile.Request) (reconcile.Result, error) {
	log.Info("Reconcile", "request", request)
	deleted := false
	modifyImageTagToDigest := &mutationsv1alpha1.ModifyImageTagToDigest{}
	err := r.Get(ctx, request.NamespacedName, modifyImageTagToDigest)
	if err != nil {
		if !errors.IsNotFound(err) {
			return reconcile.Result{}, err
		}
		deleted = true
		modifyImageTagToDigest = &mutationsv1alpha1.ModifyImageTagToDigest{
			ObjectMeta: metav1.ObjectMeta{
				Name:      request.NamespacedName.Name,
				Namespace: request.NamespacedName.Namespace,
			},
			TypeMeta: metav1.TypeMeta{
				Kind:       "ModifyImageTagToDigest",
				APIVersion: fmt.Sprintf("%s/%s", mutationsv1alpha1.GroupVersion.Group, mutationsv1alpha1.GroupVersion.Version),
			},
		}
	}
	deleted = deleted || !modifyImageTagToDigest.GetDeletionTimestamp().IsZero()
	tracker := r.tracker.For(gvkModifyImageTagToDigest)

	mID, err := types.MakeID(modifyImageTagToDigest)
	if err != nil {
		tracker.TryCancelExpect(modifyImageTagToDigest)
		log.Error(err, "Failed to get id out of ModifyImageTagToDigest")
		return reconcile.Result{}, err
	}

	if deleted {
		tracker.CancelExpect(modifyImageTagToDigest)

		if err := r.system.Remove(mID); err != nil {
			log.Error(err, "Remove failed", "resource", request.NamespacedName)
			return reconcile.Result{}, err
		}

		sName, err := statusv1beta1.KeyForMutatorID(util.GetPodName(), mID)
		if err != nil {
			return reconcile.Result{}, err
		}
		status := &statusv1beta1.MutatorPodStatus{}
		status.SetName(sName)
		status.SetNamespace(util.GetNamespace())
		if err := r.Delete(ctx, status); err != nil {
			if !errors.IsNotFound(err) {
				return reconcile.Result{}, err
			}
		}

		return reconcile.Result{}, nil
	}

	status, err := r.getOrCreatePodStatus(mID)
	if err != nil {
		log.Info("could not get/create pod status object", "error", err)
		return reconcile.Result{}, err
	}
	status.Status.MutatorUID = modifyImageTagToDigest.GetUID()
	status.Status.ObservedGeneration = modifyImageTagToDigest.GetGeneration()
	status.Status.Errors = nil

	mutator, err := mutators.MutatorForModifyImageTagToDigest(modifyImageTagToDigest, r.providerCache)
	if err != nil {
		log.Error(err, "Creating mutator for resource failed", "resource", request.NamespacedName)
		tracker.TryCancelExpect(modifyImageTagToDigest)
		status.Status.Errors = append(status.Status.Errors, statusv1beta1.MutatorError{Message: err.Error()})
		if err2 := r.Update(ctx, status); err != nil {
			log.Error(err2, "could not update mutator status")
		}
		return reconcile.Result{}, err
	}

	if err := r.system.Upsert(mutator); err != nil {
		log.Error(err, "Insert failed", "resource", request.NamespacedName)
		tracker.TryCancelExpect(modifyImageTagToDigest)
		status.Status.Errors = append(status.Status.Errors, statusv1beta1.MutatorError{Message: err.Error()})
		if err2 := r.Update(ctx, status); err != nil {
			log.Error(err2, "could not update mutator status")
		}
		return reconcile.Result{}, err
	}

	tracker.Observe(modifyImageTagToDigest)
	status.Status.Enforced = true

	if err := r.Update(ctx, status); err != nil {
		log.Error(err, "could not update mutator status")
		return reconcile.Result{}, err
	}
	return ctrl.Result{}, nil
}

func (r *Reconciler) getOrCreatePodStatus(mutatorID types.ID) (*statusv1beta1.MutatorPodStatus, error) {
	statusObj := &statusv1beta1.MutatorPodStatus{}
	sName, err := statusv1beta1.KeyForMutatorID(util.GetPodName(), mutatorID)
	if err != nil {
		return nil, err
	}
	key := apiTypes.NamespacedName{Name: sName, Namespace: util.GetNamespace()}
	if err := r.Get(context.TODO(), key, statusObj); err != nil {
		if !errors.IsNotFound(err) {
			return nil, err
		}
	} else {
		return statusObj, nil
	}
	pod, err := r.getPod()
	if err != nil {
		return nil, err
	}
	statusObj, err = statusv1beta1.NewMutatorStatusForPod(pod, mutatorID, r.scheme)
	if err != nil {
		return nil, err
	}
	if err := r.Create(context.TODO(), statusObj); err != nil {
		return nil, err
	}
	return statusObj, nil
}

func (r *Reconciler) defaultGetPod() (*corev1.Pod, error) {
	// require injection of GetPod in order to control what client we use to
	// guarantee we don't inadvertently create a watch
	panic("GetPod must be injected")
}
