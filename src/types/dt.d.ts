export interface RouterData {
    name: string,
    path: string;
    redirect?: string;
    component: any;
    children?: Array<any>
}

// 节点类型
export interface NodeType {
    nodeId: string;
    prevId: string;
    title: string
    nodeType: string
    approvalName: string
    isAproval: string;
    isEnd: string;
    currentStatus: string;
    approvalPerson: Array<string>[],
    porperties: {},
    childrenNode: Array<NodeType>
}

