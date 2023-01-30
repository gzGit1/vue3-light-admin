import type { NodeType } from '@/types/dt'
export default function setNodeContent() {
    const setStartNodeContent = (item: NodeType, info: string) => {
        item.approvalName = info;
    };
    const setApprovalNodeContent = (item: NodeType, info: string) => {
        item.approvalName = info;
    };
    const setNotifierNodeContent = (item: NodeType, info: string) => {
        item.approvalName = info;
    };
    const setConditionNodeContent = (item: NodeType, info: string) => {
        item.approvalName = info;
    };
    return {
        setStartNodeContent,
        setApprovalNodeContent,
        setNotifierNodeContent,
        setConditionNodeContent
    }
}