package mutators

import (
	"fmt"
	"reflect"
	"strings"

	"github.com/google/go-cmp/cmp"
	externaldatav1alpha1 "github.com/open-policy-agent/frameworks/constraint/pkg/apis/externaldata/v1alpha1"
	"github.com/open-policy-agent/frameworks/constraint/pkg/externaldata"
	frameworksexternaldata "github.com/open-policy-agent/frameworks/constraint/pkg/externaldata"
	mutationsv1alpha1 "github.com/open-policy-agent/gatekeeper/apis/mutations/v1alpha1"
	"github.com/open-policy-agent/gatekeeper/pkg/mutation/match"
	"github.com/open-policy-agent/gatekeeper/pkg/mutation/mutators/core"
	"github.com/open-policy-agent/gatekeeper/pkg/mutation/path/parser"
	"github.com/open-policy-agent/gatekeeper/pkg/mutation/path/tester"
	patht "github.com/open-policy-agent/gatekeeper/pkg/mutation/path/tester"
	"github.com/open-policy-agent/gatekeeper/pkg/mutation/schema"
	"github.com/open-policy-agent/gatekeeper/pkg/mutation/types"
	"github.com/pkg/errors"
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime"
)

// ModifyImageTagToDigestMutator is a mutator object built out of a
// ModifyImageTagToDigest instance.
type ModifyImageTagToDigestMutator struct {
	id                     types.ID
	modifyImageTagToDigest *mutationsv1alpha1.ModifyImageTagToDigest
	path                   parser.Path
	bindings               []schema.Binding
	tester                 *patht.Tester
	valueTest              *mutationsv1alpha1.AssignIf
	providerCache          *frameworksexternaldata.ProviderCache
}

// ModifyImageTagToDigestMutator implements mutatorWithSchema
var _ schema.MutatorWithSchema = &ModifyImageTagToDigestMutator{}

func (m *ModifyImageTagToDigestMutator) GetExternalDataProvider() string {
	return m.modifyImageTagToDigest.Spec.Parameters.ExternalData.Provider
}

func (m *ModifyImageTagToDigestMutator) GetExternalDataCache(name string) (*externaldatav1alpha1.Provider, error) {
	data, err := m.providerCache.Get(name)
	if err != nil {
		return nil, err
	}
	return &data, nil
}

func (m *ModifyImageTagToDigestMutator) Matches(obj runtime.Object, ns *corev1.Namespace) bool {
	if !match.AppliesTo(m.modifyImageTagToDigest.Spec.ApplyTo, obj) {
		return false
	}
	matches, err := match.Matches(&m.modifyImageTagToDigest.Spec.Match, obj, ns)
	if err != nil {
		log.Error(err, "ModifyImageTagToDigestMutator.Matches failed", "modifyImageTagToDigest", m.modifyImageTagToDigest.Name)
		return false
	}
	return matches
}

func (m *ModifyImageTagToDigestMutator) Mutate(obj *unstructured.Unstructured, providerResponseCache map[string]string) (bool, error) {
	t, err := tester.New(m.Path(), []tester.Test{
		{SubPath: m.Path(), Condition: tester.MustExist},
	})
	if err != nil {
		return false, err
	}

	containers, _, _ := unstructured.NestedFieldNoCopy(obj.Object, "spec", "containers")
	containerList, _ := containers.([]interface{})

	for _, con := range containerList {
		conMap, _ := con.(map[string]interface{})
		image, _, _ := unstructured.NestedString(conMap, "image")

		if strings.Contains(image, "sha256") {
			continue
		}

		providerResponseCache[image] = ""
	}

	return core.Mutate(m, t, m.testValue, obj, providerResponseCache)
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

func (m *ModifyImageTagToDigestMutator) Path() parser.Path {
	return m.path
}

func (m *ModifyImageTagToDigestMutator) DeepCopy() types.Mutator {
	res := &ModifyImageTagToDigestMutator{
		id:                     m.id,
		modifyImageTagToDigest: m.modifyImageTagToDigest.DeepCopy(),
		path: parser.Path{
			Nodes: make([]parser.Node, len(m.path.Nodes)),
		},
		bindings:      make([]schema.Binding, len(m.bindings)),
		providerCache: m.providerCache,
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

// MutatorForModifyImageTagToDigest returns an MutatorForModifyImageTagToDigestMutator built from
// the given ModifyImageTagToDigest instance.
func MutatorForModifyImageTagToDigest(modifyImageTagToDigest *mutationsv1alpha1.ModifyImageTagToDigest, providerCache *externaldata.ProviderCache) (*ModifyImageTagToDigestMutator, error) {
	path, err := parser.Parse(modifyImageTagToDigest.Spec.Location)
	if err != nil {
		return nil, errors.Wrapf(err, "invalid location format `%s` for ModifyImageTagToDigest %s", modifyImageTagToDigest.Spec.Location, modifyImageTagToDigest.GetName())
	}
	if !isValidImagePath(path) {
		return nil, fmt.Errorf("invalid location for ModifyImageTagToDigest %s: %s", modifyImageTagToDigest.GetName(), modifyImageTagToDigest.Spec.Location)
	}

	id := types.MakeID(modifyImageTagToDigest)

	valueTests, err := modifyImageTagToDigest.ValueTests()
	if err != nil {
		return nil, err
	}

	applyTos := applyToToBindings(modifyImageTagToDigest.Spec.ApplyTo)
	if len(applyTos) == 0 {
		return nil, fmt.Errorf("applyTo required for ModifyImageTagToDigest mutator %s", modifyImageTagToDigest.GetName())
	}
	for _, applyTo := range applyTos {
		if len(applyTo.Groups) == 0 || len(applyTo.Versions) == 0 || len(applyTo.Kinds) == 0 {
			return nil, fmt.Errorf("invalid applyTo for ModifyImageTagToDigest mutator %s, all of group, version and kind must be specified", modifyImageTagToDigest.GetName())
		}
	}

	return &ModifyImageTagToDigestMutator{
		id:                     id,
		modifyImageTagToDigest: modifyImageTagToDigest.DeepCopy(),
		bindings:               applyTos,
		path:                   path,
		valueTest:              &valueTests,
		providerCache:          providerCache,
	}, nil
}

// Verifies that the given path is a valid image
func isValidImagePath(path parser.Path) bool {
	return reflect.DeepEqual(path.Nodes[len(path.Nodes)-1], &parser.Object{Reference: "image"})
}

// IsValidModifyImageTagToDigest returns an error if the given modifyimagetagtodigest object is not
// semantically valid
func IsValidModifyImageTagToDigest(modifyImageTagToDigest *mutationsv1alpha1.ModifyImageTagToDigest) error {
	if _, err := MutatorForModifyImageTagToDigest(modifyImageTagToDigest, &externaldata.ProviderCache{}); err != nil {
		return err
	}
	return nil
}
