//go:build !ignore_autogenerated
// +build !ignore_autogenerated

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

// Code generated by controller-gen. DO NOT EDIT.

package v1beta1

import (
	statusv1beta1 "github.com/open-policy-agent/gatekeeper/apis/status/v1beta1"
	"github.com/open-policy-agent/gatekeeper/pkg/mutation/match"
	"k8s.io/apimachinery/pkg/runtime"
)

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *Assign) DeepCopyInto(out *Assign) {
	*out = *in
	out.TypeMeta = in.TypeMeta
	in.ObjectMeta.DeepCopyInto(&out.ObjectMeta)
	in.Spec.DeepCopyInto(&out.Spec)
	in.Status.DeepCopyInto(&out.Status)
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new Assign.
func (in *Assign) DeepCopy() *Assign {
	if in == nil {
		return nil
	}
	out := new(Assign)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyObject is an autogenerated deepcopy function, copying the receiver, creating a new runtime.Object.
func (in *Assign) DeepCopyObject() runtime.Object {
	if c := in.DeepCopy(); c != nil {
		return c
	}
	return nil
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *AssignField) DeepCopyInto(out *AssignField) {
	*out = *in
	if in.Value != nil {
		in, out := &in.Value, &out.Value
		*out = (*in).DeepCopy()
	}
	if in.FromMetadata != nil {
		in, out := &in.FromMetadata, &out.FromMetadata
		*out = new(FromMetadata)
		**out = **in
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new AssignField.
func (in *AssignField) DeepCopy() *AssignField {
	if in == nil {
		return nil
	}
	out := new(AssignField)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *AssignList) DeepCopyInto(out *AssignList) {
	*out = *in
	out.TypeMeta = in.TypeMeta
	in.ListMeta.DeepCopyInto(&out.ListMeta)
	if in.Items != nil {
		in, out := &in.Items, &out.Items
		*out = make([]Assign, len(*in))
		for i := range *in {
			(*in)[i].DeepCopyInto(&(*out)[i])
		}
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new AssignList.
func (in *AssignList) DeepCopy() *AssignList {
	if in == nil {
		return nil
	}
	out := new(AssignList)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyObject is an autogenerated deepcopy function, copying the receiver, creating a new runtime.Object.
func (in *AssignList) DeepCopyObject() runtime.Object {
	if c := in.DeepCopy(); c != nil {
		return c
	}
	return nil
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *AssignMetadata) DeepCopyInto(out *AssignMetadata) {
	*out = *in
	out.TypeMeta = in.TypeMeta
	in.ObjectMeta.DeepCopyInto(&out.ObjectMeta)
	in.Spec.DeepCopyInto(&out.Spec)
	in.Status.DeepCopyInto(&out.Status)
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new AssignMetadata.
func (in *AssignMetadata) DeepCopy() *AssignMetadata {
	if in == nil {
		return nil
	}
	out := new(AssignMetadata)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyObject is an autogenerated deepcopy function, copying the receiver, creating a new runtime.Object.
func (in *AssignMetadata) DeepCopyObject() runtime.Object {
	if c := in.DeepCopy(); c != nil {
		return c
	}
	return nil
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *AssignMetadataList) DeepCopyInto(out *AssignMetadataList) {
	*out = *in
	out.TypeMeta = in.TypeMeta
	in.ListMeta.DeepCopyInto(&out.ListMeta)
	if in.Items != nil {
		in, out := &in.Items, &out.Items
		*out = make([]AssignMetadata, len(*in))
		for i := range *in {
			(*in)[i].DeepCopyInto(&(*out)[i])
		}
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new AssignMetadataList.
func (in *AssignMetadataList) DeepCopy() *AssignMetadataList {
	if in == nil {
		return nil
	}
	out := new(AssignMetadataList)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyObject is an autogenerated deepcopy function, copying the receiver, creating a new runtime.Object.
func (in *AssignMetadataList) DeepCopyObject() runtime.Object {
	if c := in.DeepCopy(); c != nil {
		return c
	}
	return nil
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *AssignMetadataSpec) DeepCopyInto(out *AssignMetadataSpec) {
	*out = *in
	in.Match.DeepCopyInto(&out.Match)
	in.Parameters.DeepCopyInto(&out.Parameters)
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new AssignMetadataSpec.
func (in *AssignMetadataSpec) DeepCopy() *AssignMetadataSpec {
	if in == nil {
		return nil
	}
	out := new(AssignMetadataSpec)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *AssignMetadataStatus) DeepCopyInto(out *AssignMetadataStatus) {
	*out = *in
	if in.ByPod != nil {
		in, out := &in.ByPod, &out.ByPod
		*out = make([]statusv1beta1.MutatorPodStatusStatus, len(*in))
		for i := range *in {
			(*in)[i].DeepCopyInto(&(*out)[i])
		}
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new AssignMetadataStatus.
func (in *AssignMetadataStatus) DeepCopy() *AssignMetadataStatus {
	if in == nil {
		return nil
	}
	out := new(AssignMetadataStatus)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *AssignSpec) DeepCopyInto(out *AssignSpec) {
	*out = *in
	if in.ApplyTo != nil {
		in, out := &in.ApplyTo, &out.ApplyTo
		*out = make([]match.ApplyTo, len(*in))
		for i := range *in {
			(*in)[i].DeepCopyInto(&(*out)[i])
		}
	}
	in.Match.DeepCopyInto(&out.Match)
	in.Parameters.DeepCopyInto(&out.Parameters)
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new AssignSpec.
func (in *AssignSpec) DeepCopy() *AssignSpec {
	if in == nil {
		return nil
	}
	out := new(AssignSpec)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *AssignStatus) DeepCopyInto(out *AssignStatus) {
	*out = *in
	if in.ByPod != nil {
		in, out := &in.ByPod, &out.ByPod
		*out = make([]statusv1beta1.MutatorPodStatusStatus, len(*in))
		for i := range *in {
			(*in)[i].DeepCopyInto(&(*out)[i])
		}
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new AssignStatus.
func (in *AssignStatus) DeepCopy() *AssignStatus {
	if in == nil {
		return nil
	}
	out := new(AssignStatus)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *FromMetadata) DeepCopyInto(out *FromMetadata) {
	*out = *in
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new FromMetadata.
func (in *FromMetadata) DeepCopy() *FromMetadata {
	if in == nil {
		return nil
	}
	out := new(FromMetadata)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *MetadataParameters) DeepCopyInto(out *MetadataParameters) {
	*out = *in
	in.Assign.DeepCopyInto(&out.Assign)
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new MetadataParameters.
func (in *MetadataParameters) DeepCopy() *MetadataParameters {
	if in == nil {
		return nil
	}
	out := new(MetadataParameters)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *ModifySet) DeepCopyInto(out *ModifySet) {
	*out = *in
	out.TypeMeta = in.TypeMeta
	in.ObjectMeta.DeepCopyInto(&out.ObjectMeta)
	in.Spec.DeepCopyInto(&out.Spec)
	in.Status.DeepCopyInto(&out.Status)
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new ModifySet.
func (in *ModifySet) DeepCopy() *ModifySet {
	if in == nil {
		return nil
	}
	out := new(ModifySet)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyObject is an autogenerated deepcopy function, copying the receiver, creating a new runtime.Object.
func (in *ModifySet) DeepCopyObject() runtime.Object {
	if c := in.DeepCopy(); c != nil {
		return c
	}
	return nil
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *ModifySetList) DeepCopyInto(out *ModifySetList) {
	*out = *in
	out.TypeMeta = in.TypeMeta
	in.ListMeta.DeepCopyInto(&out.ListMeta)
	if in.Items != nil {
		in, out := &in.Items, &out.Items
		*out = make([]ModifySet, len(*in))
		for i := range *in {
			(*in)[i].DeepCopyInto(&(*out)[i])
		}
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new ModifySetList.
func (in *ModifySetList) DeepCopy() *ModifySetList {
	if in == nil {
		return nil
	}
	out := new(ModifySetList)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyObject is an autogenerated deepcopy function, copying the receiver, creating a new runtime.Object.
func (in *ModifySetList) DeepCopyObject() runtime.Object {
	if c := in.DeepCopy(); c != nil {
		return c
	}
	return nil
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *ModifySetParameters) DeepCopyInto(out *ModifySetParameters) {
	*out = *in
	if in.PathTests != nil {
		in, out := &in.PathTests, &out.PathTests
		*out = make([]PathTest, len(*in))
		copy(*out, *in)
	}
	in.Values.DeepCopyInto(&out.Values)
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new ModifySetParameters.
func (in *ModifySetParameters) DeepCopy() *ModifySetParameters {
	if in == nil {
		return nil
	}
	out := new(ModifySetParameters)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *ModifySetSpec) DeepCopyInto(out *ModifySetSpec) {
	*out = *in
	if in.ApplyTo != nil {
		in, out := &in.ApplyTo, &out.ApplyTo
		*out = make([]match.ApplyTo, len(*in))
		for i := range *in {
			(*in)[i].DeepCopyInto(&(*out)[i])
		}
	}
	in.Match.DeepCopyInto(&out.Match)
	in.Parameters.DeepCopyInto(&out.Parameters)
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new ModifySetSpec.
func (in *ModifySetSpec) DeepCopy() *ModifySetSpec {
	if in == nil {
		return nil
	}
	out := new(ModifySetSpec)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *ModifySetStatus) DeepCopyInto(out *ModifySetStatus) {
	*out = *in
	if in.ByPod != nil {
		in, out := &in.ByPod, &out.ByPod
		*out = make([]statusv1beta1.MutatorPodStatusStatus, len(*in))
		for i := range *in {
			(*in)[i].DeepCopyInto(&(*out)[i])
		}
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new ModifySetStatus.
func (in *ModifySetStatus) DeepCopy() *ModifySetStatus {
	if in == nil {
		return nil
	}
	out := new(ModifySetStatus)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *Parameters) DeepCopyInto(out *Parameters) {
	*out = *in
	if in.PathTests != nil {
		in, out := &in.PathTests, &out.PathTests
		*out = make([]PathTest, len(*in))
		copy(*out, *in)
	}
	in.Assign.DeepCopyInto(&out.Assign)
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new Parameters.
func (in *Parameters) DeepCopy() *Parameters {
	if in == nil {
		return nil
	}
	out := new(Parameters)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *PathTest) DeepCopyInto(out *PathTest) {
	*out = *in
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new PathTest.
func (in *PathTest) DeepCopy() *PathTest {
	if in == nil {
		return nil
	}
	out := new(PathTest)
	in.DeepCopyInto(out)
	return out
}
