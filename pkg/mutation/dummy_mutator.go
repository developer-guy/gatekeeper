package mutation

import (
	"reflect"

	externaldatav1alpha1 "github.com/open-policy-agent/frameworks/constraint/pkg/apis/externaldata/v1alpha1"
	mutationsv1alpha1 "github.com/open-policy-agent/gatekeeper/apis/mutations/v1alpha1"
	"github.com/open-policy-agent/gatekeeper/pkg/mutation/path/parser"
	path "github.com/open-policy-agent/gatekeeper/pkg/mutation/path/tester"
	"github.com/open-policy-agent/gatekeeper/pkg/mutation/types"
	admissionv1 "k8s.io/api/admission/v1"
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime"
)

var _ types.Mutator = &dummyMutator{}

// dummyMutator is a blank mutator that makes it easier to test the core mutation function
type dummyMutator struct {
	name  string
	value interface{}
	path  *parser.Path
	match mutationsv1alpha1.Match
}

func (d *dummyMutator) DeepCopy() types.Mutator {
	return d
}

func (d *dummyMutator) HasDiff(m types.Mutator) bool {
	return !reflect.DeepEqual(d, m)
}

func (d *dummyMutator) ID() types.ID {
	return types.ID{Group: "mutators.gatekeeper.sh", Kind: "DummyMutator", Name: d.name}
}

func (d *dummyMutator) Value() (interface{}, error) {
	return d.value, nil
}

func (d *dummyMutator) Path() *parser.Path {
	return d.path
}

func (d *dummyMutator) Matches(obj runtime.Object, ns *corev1.Namespace) bool {
	matches, err := Matches(d.match, obj, ns)
	if err != nil {
		return false
	}
	return matches
}

func (d *dummyMutator) Mutate(obj *unstructured.Unstructured, req *admissionv1.AdmissionRequest) (bool, error) {
	t, _ := path.New(nil)
	return mutate(d, t, func(_ interface{}, _ bool) bool { return true }, obj, req)
}

func (d *dummyMutator) String() string {
	return ""
}

func newDummyMutator(name, path string, value interface{}) *dummyMutator {
	p, err := parser.Parse(path)
	if err != nil {
		panic(err)
	}
	return &dummyMutator{name: name, path: p, value: value}
}

func (d *dummyMutator) HasExternalData() string {
	return ""
}

func (d *dummyMutator) GetExternalData() externaldatav1alpha1.Provider {
	return externaldatav1alpha1.Provider{}
}
