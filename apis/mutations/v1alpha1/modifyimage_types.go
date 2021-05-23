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

package v1alpha1

import (
	"github.com/open-policy-agent/gatekeeper/pkg/mutation/match"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
)

// AssignSpec defines the desired state of Assign
type ModifyImageTagToDigestSpec struct {
	ApplyTo    []match.ApplyTo          `json:"applyTo,omitempty"`
	Match      match.Match              `json:"match,omitempty"`
	Location   string                   `json:"location,omitempty"`
	Parameters ModifyImageTagToDigestParameters `json:"parameters,omitempty"`
}

type ModifyImageTagToDigestParameters struct {
	PathTests []PathTest `json:"pathTests,omitempty"`

	// once https://github.com/kubernetes-sigs/controller-tools/pull/528
	// is merged, we can use an actual object
	AssignIf runtime.RawExtension `json:"assignIf,omitempty"`

	ExternalData ExternalData `json:"externalData,omitempty"`
}

// +kubebuilder:object:root=true
// +kubebuilder:resource:path="assign"
// +kubebuilder:resource:scope="Cluster"
// +kubebuilder:subresource:status

// Assign is the Schema for the assign API
type ModifyImageTagToDigest struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec ModifyImageTagToDigestSpec `json:"spec,omitempty"`
}

// +kubebuilder:object:root=true

// AssignList contains a list of Assign
type ModifyImageTagToDigestList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []ModifyImageTagToDigest `json:"items"`
}

func init() {
	SchemeBuilder.Register(&ModifyImageTagToDigest{}, &ModifyImageTagToDigestList{})
}
