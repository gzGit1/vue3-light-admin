import { ref, watch } from "vue";
import { v4 as uuidv4 } from "uuid";
import type { NodeType } from '@/types/dt'
// 模拟数据
import mockNodeData from '../data/mock';
export default function nodeOperate() {
    // let nodeList = ref(mockNodeData);
    let nodeList = ref<Array<NodeType>>([
        {
            nodeId: uuidv4(),
            prevId: '',
            title: "发起人",
            nodeType: "start",
            approvalName: "请选择",
            isAproval: "",
            isEnd: "",
            currentStatus: "",
            approvalPerson: [],
            porperties: {},
            childrenNode: [],
        }
    ]);
    let sendServeData = [];
    watch(
        () => nodeList,
        (newValue, oldValue) => {
            sendServeData = newValue.value;
        },
        {
            deep: true
        }
    );
    // 创建分支节点
    // 所有节点的添加要区分是否是条件节点，
    // 条件节点后面继续添加条件节点结构会发生变化
    const createBranchNodeItem = (node, list) => {
        const { nodeType } = node;
        if (nodeType == 'condition') {
            const nodeId = uuidv4();
            let position = findNodeItem(node.nodeId, list);
            const childConditionNodeItem = {
                title: "分支节点",
                nodeType: "branch",
                nodeId: nodeId,
                prevId: node.nodeId,
                isAproval: "",
                isEnd: "",
                currentStatus: "",
                approvalName: "",
                approvalPerson: [],
                porperties: {},
                childrenNode: [
                    {
                        id: "",
                        title: "条件",
                        nodeType: "condition",
                        nodeId: uuidv4(),
                        prevId: nodeId,
                        isAproval: "",
                        isEnd: "",
                        approvalName: "条件内容",
                        currentStatus: "",
                        approvalPerson: [],
                        childrenNode: [],
                        porperties: {},
                    },
                    {
                        id: "",
                        title: "条件",
                        nodeType: "condition",
                        nodeId: uuidv4(),
                        prevId: nodeId,
                        isAproval: "",
                        isEnd: "",
                        approvalName: "条件内容",
                        currentStatus: "",
                        approvalPerson: [],
                        childrenNode: [],
                        porperties: {}
                    }
                ]
            };
            node.childrenNode.unshift(childConditionNodeItem);
        } else {
            const nodeId = uuidv4();
            const appendNodeItem = {
                title: "分支节点",
                nodeType: "branch",
                nodeId: '',
                prevId: '',
                isAproval: "",
                isEnd: "",
                currentStatus: "",
                approvalName: "",
                approvalPerson: [],
                porperties: {},
                childrenNode: [
                    {
                        title: "条件",
                        nodeType: "condition",
                        nodeId: uuidv4(),
                        prevId: '',
                        isAproval: "",
                        isEnd: "",
                        approvalName: "条件内容",
                        currentStatus: "",
                        approvalPerson: [],
                        childrenNode: [],
                        porperties: {},
                    },
                    {
                        title: "条件",
                        nodeType: "condition",
                        nodeId: uuidv4(),
                        prevId: '',
                        isAproval: "",
                        isEnd: "",
                        approvalName: "条件内容",
                        currentStatus: "",
                        approvalPerson: [],
                        childrenNode: [],
                        porperties: {}
                    }
                ]
            }
            if (node.prevId) {
                appendNodeItem.prevId = node.prevId;
            }
            appendNodeItem.nodeId = nodeId;
            appendNodeItem.childrenNode.forEach(val => {
                val.prevId = nodeId;
            });
            let position = findNodeItem(node.nodeId, list);
            if (position != null) {
                list.splice(position + 1, 0, appendNodeItem);
            }
        }

    };
    // 创建审批人节点
    const createApprovalNodeItem = (node, list) => {
        const { nodeType, nodeId } = node;
        if (nodeType == 'condition') {
            const approvalNode = {
                title: "审批人",
                nodeType: "approval",
                nodeId: uuidv4(),
                prevId: nodeId,
                approvalName: "请选择",
                isAproval: "",
                isEnd: "",
                currentStatus: "",
                approvalPerson: [],
                childrenNode: [],
                porperties: {}
            };
            node.childrenNode.unshift(approvalNode);
        } else {
            const appendNodeItem = {
                title: "审批人",
                nodeType: "approval",
                nodeId: uuidv4(),
                prevId: '',
                approvalName: "请选择",
                isAproval: "",
                isEnd: "",
                currentStatus: "",
                approvalPerson: [],
                childrenNode: [],
                porperties: {}
            };
            let position = findNodeItem(node.nodeId, list);
            if (node.prevId) {
                appendNodeItem.prevId = node.prevId;
            }
            if (position != null) {
                list.splice(position + 1, 0, appendNodeItem);
            }
        }
    }
    // 创建抄送人节点
    const createNotifierNodeItem = (node, list) => {
        const { nodeType, nodeId } = node;
        if (nodeType == 'condition') {
            const notifierNode = {
                title: "抄送人",
                nodeType: "notifier",
                nodeId: uuidv4(),
                prevId: nodeId,
                approvalName: "请选择",
                isAproval: "",
                isEnd: "",
                currentStatus: "",
                approvalPerson: [],
                childrenNode: [],
                porperties: {}
            };
            node.childrenNode.unshift(notifierNode);
        } else {
            const appendNodeItem = {
                title: "抄送人",
                nodeType: "notifier",
                nodeId: uuidv4(),
                prevId: '',
                approvalName: "请选择",
                isAproval: "",
                isEnd: "",
                currentStatus: "",
                approvalPerson: [],
                childrenNode: [],
                porperties: {}
            };
            let position = findNodeItem(node.nodeId, list);
            if (node.prevId) {
                appendNodeItem.prevId = node.prevId;
            }
            if (position != null) {
                list.splice(position + 1, 0, appendNodeItem);
            }
        }
    }
    // 创建条件节点
    const createConditionNodeItem = (node, list) => {
        const appendNodeItem = {
            title: "条件",
            nodeType: "condition",
            nodeId: uuidv4(),
            prevId: '',
            isAproval: "",
            isEnd: "",
            approvalName: "条件内容",
            currentStatus: "",
            approvalPerson: [],
            childrenNode: [],
            porperties: {}
        };
        if (node.nodeId) {
            appendNodeItem.prevId = node.nodeId;
        }
        list.push(appendNodeItem);
    }
    // 查找节点的位置
    const findNodeItem = (nodeId, list) => {
        let position = null;
        // 获取位置
        list.some((element, index) => {
            if (element.nodeId == nodeId) {
                position = index;
                return true;
            }
        })
        return position;
    }
    // 节点删除
    const deleteNodeItem = (node, list,pList?:[]) => {
        let position = findNodeItem(node.nodeId, list);
        if (position != null) {
            list.splice(position, 1)
        }
    }
    const deleteConditionItem = (node, list, pList) => {
        // 找出nodeId==prevId的节点；
        let prevId = list.length > 0 && list[0].prevId;
        // 如果条件节点仅仅只有两个节点，将整个分支都删除   
        if (list.length > 2) {
            let position = findNodeItem(node.nodeId, list);
            if (position != null) {
                list.splice(position, 1)
            }
        } else {
            let position = findNodeItem(prevId, pList);
            if (position != null) {
                pList.splice(position, 1)
            }
        }
    }
    return {
        nodeList,
        createBranchNodeItem,
        createApprovalNodeItem,
        createNotifierNodeItem,
        deleteNodeItem,
        createConditionNodeItem,
        deleteConditionItem
    }
}