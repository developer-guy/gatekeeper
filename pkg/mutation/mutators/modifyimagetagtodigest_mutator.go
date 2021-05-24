package mutators

import (
	"fmt"
	"reflect"

	"github.com/google/go-cmp/cmp"
	externaldatav1alpha1 "github.com/open-policy-agent/frameworks/constraint/pkg/apis/externaldata/v1alpha1"
	frameworksexternaldata "github.com/open-policy-agent/frameworks/constraint/pkg/externaldata"
	mutationsv1alpha1 "github.com/open-policy-agent/gatekeeper/apis/mutations/v1alpha1"
	"github.com/open-policy-agent/gatekeeper/pkg/mutation/match"
	"github.com/open-policy-agent/gatekeeper/pkg/mutation/mutators/core"
	"github.com/open-policy-agent/gatekeeper/pkg/mutation/path/parser"
	patht "github.com/open-policy-agent/gatekeeper/pkg/mutation/path/tester"
	"github.com/open-policy-agent/gatekeeper/pkg/mutation/schema"
	"github.com/open-policy-agent/gatekeeper/pkg/mutation/types"
	"github.com/pkg/errors"
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime"
)

var (
	imageValidSubPath = []parser.Node{
		&parser.Object{
			Reference: "image",
		},
	}
)

// ModifyImageTagToDigestMutator is a mutator object built out of a
// ModifyImageTagToDigest instance.
type ModifyImageTagToDigestMutator struct {
	id                     types.ID
	modifyImageTagToDigest *mutationsv1alpha1.ModifyImageTagToDigest
	path                   *parser.Path
	bindings               []schema.Binding
	tester                 *patht.Tester
	valueTest              *mutationsv1alpha1.AssignIf
	providerCache          *frameworksexternaldata.ProviderCache
}

// AssignMutator implements mutatorWithSchema
var _ schema.MutatorWithSchema = &ModifyImageTagToDigestMutator{}

func (m *ModifyImageTagToDigestMutator) GetExternalDataProvider() string {
	return m.modifyImageTagToDigest.Spec.Parameters.ExternalData.Provider
}

func (m *ModifyImageTagToDigestMutator) GetExternalDataCache(name string) *externaldatav1alpha1.Provider {
	data, _ := m.providerCache.Get(name)
	return &data
}

func (m *ModifyImageTagToDigestMutator) Matches(obj runtime.Object, ns *corev1.Namespace) bool {
	if !match.AppliesTo(m.modifyImageTagToDigest.Spec.ApplyTo, obj) {
		return false
	}
	matches, err := match.Matches(m.modifyImageTagToDigest.Spec.Match, obj, ns)
	if err != nil {
		log.Error(err, "AssignMutator.Matches failed", "assign", m.modifyImageTagToDigest.Name)
		return false
	}
	return matches
}

func (m *ModifyImageTagToDigestMutator) Mutate(obj *unstructured.Unstructured) (bool, error) {
	return core.Mutate(m, m.tester, m.testValue, obj)
}

// valueTest returns true if it is okay for the mutation func to override the value
func (m *ModifyImageTagToDigestMutator) testValue(v interface{}, exists bool) bool {
	if len(m.valueTest.In) != 0 {
		ifInMatched := false
		if !exists {
			// a missing value cannot satisfy the "In" test
			return false
		}
		for _, obj := range m.valueTest.In {
			if cmp.Equal(v, obj) {
				ifInMatched = true
				break
			}
		}
		if !ifInMatched {
			return false
		}
	}

	if !exists {
		// a missing value cannot violate NotIn
		return true
	}

	for _, obj := range m.valueTest.NotIn {
		if cmp.Equal(v, obj) {
			return false
		}
	}
	return true
}

func (m *ModifyImageTagToDigestMutator) ID() types.ID {
	return m.id
}

func (m *ModifyImageTagToDigestMutator) SchemaBindings() []schema.Binding {
	return m.bindings
}

func (m *ModifyImageTagToDigestMutator) Value() (interface{}, error) {
	return nil, nil
}

func (m *ModifyImageTagToDigestMutator) HasDiff(mutator types.Mutator) bool {
	toCheck, ok := mutator.(*ModifyImageTagToDigestMutator)
	if !ok { // different types, different
		return true
	}

	if !cmp.Equal(toCheck.id, m.id) {
		return true
	}
	if !cmp.Equal(toCheck.path, m.path) {
		return true
	}
	if !cmp.Equal(toCheck.bindings, m.bindings) {
		return true
	}

	// any difference in spec may be enough
	if !cmp.Equal(toCheck.modifyImageTagToDigest.Spec, m.modifyImageTagToDigest.Spec) {
		return true
	}

	return false
}

func (m *ModifyImageTagToDigestMutator) Path() *parser.Path {
	return m.path
}

func (m *ModifyImageTagToDigestMutator) DeepCopy() types.Mutator {
	res := &ModifyImageTagToDigestMutator{
		id:     m.id,
		path: &parser.Path{
			Nodes: make([]parser.Node, len(m.path.Nodes)),
		},
		bindings: make([]schema.Binding, len(m.bindings)),
	}
	copy(res.path.Nodes, m.path.Nodes)
	copy(res.bindings, m.bindings)
	res.tester = m.tester.DeepCopy()
	res.valueTest = m.valueTest.DeepCopy()
	return res
}

func (m *ModifyImageTagToDigestMutator) String() string {
	return fmt.Sprintf("%s/%s/%s:%d", m.id.Kind, m.id.Namespace, m.id.Name, m.modifyImageTagToDigest.GetGeneration())
}

// MutatorForAssign returns an AssignMutator built from
// the given assign instance.
func MutatorForModifyImageTagToDigest(modifyImageTag *mutationsv1alpha1.ModifyImageTagToDigest) (*ModifyImageTagToDigestMutator, error) {
	path, err := parser.Parse(modifyImageTag.Spec.Location)
	if err != nil {
		return nil, errors.Wrapf(err, "invalid location format `%s` for ModifyImageTagToDigest %s", modifyImageTag.Spec.Location, modifyImageTag.GetName())
	}
	if !isValidImagePath(path) {
		return nil, fmt.Errorf("invalid location for ModifyImageTagToDigest %s: %s", modifyImageTag.GetName(), modifyImageTag.Spec.Location)
	}

	id, err := types.MakeID(modifyImageTag)
	if err != nil {
		return nil, errors.Wrap(err, "failed to retrieve id for ModifyImageTagToDigest type")
	}

	applyTos := applyToToBindings(modifyImageTag.Spec.ApplyTo)
	if len(applyTos) == 0 {
		return nil, fmt.Errorf("applyTo required for Assign mutator %s", modifyImageTag.GetName())
	}
	for _, applyTo := range applyTos {
		if len(applyTo.Groups) == 0 || len(applyTo.Versions) == 0 || len(applyTo.Kinds) == 0 {
			return nil, fmt.Errorf("invalid applyTo for ModifyImageTagToDigest mutator %s, all of group, version and kind must be specified", modifyImageTag.GetName())
		}
	}

	return &ModifyImageTagToDigestMutator{
		id:        id,
		bindings:  applyTos,
		path:      path,
	}, nil
}


// Verifies that the given path is a valid image
func isValidImagePath(path *parser.Path) bool {
	if reflect.DeepEqual(path.Nodes[len(path.Nodes)-1], imageValidSubPath) {
		return true
	}
	return false
}