import type { NodeType } from '@/types/dt'
let mockNodeData: Array<NodeType> = [
    {
        "nodeId": "002fac3c-3310-45bd-9345-940c24fc3166",
        "prevId": "",
        "title": "开始节点",
        "nodeType": "start",
        "approvalName": "请选择",
        "isAproval": "",
        "isEnd": "",
        "currentStatus": "",
        "approvalPerson": [],
        "porperties": {},
        "childrenNode": []
    },
    {
        "title": "分支节点",
        "nodeType": "branch",
        "nodeId": "ca8f7d0e-c3b5-4d62-81b7-549aadb32691",
        "prevId": "",
        "isAproval": "",
        "isEnd": "",
        "currentStatus": "",
        "approvalName": "",
        "approvalPerson": [],
        "porperties": {},
        "childrenNode": [
            {
                "title": "条件",
                "nodeType": "condition",
                "nodeId": "a2628bac-80f8-4a90-8085-1c1360efc5e1",
                "prevId": "ca8f7d0e-c3b5-4d62-81b7-549aadb32691",
                "isAproval": "",
                "isEnd": "",
                "approvalName": "条件内容",
                "currentStatus": "",
                "approvalPerson": [],
                "childrenNode": [
                    {
                        "title": "分支节点",
                        "nodeType": "branch",
                        "nodeId": "44f51bcf-339b-4b90-b4b9-a92b2d29a30a",
                        "prevId": "a2628bac-80f8-4a90-8085-1c1360efc5e1",
                        "isAproval": "",
                        "isEnd": "",
                        "currentStatus": "",
                        "approvalName": "",
                        "approvalPerson": [],
                        "porperties": {},
                        "childrenNode": [
                            {

                                "title": "条件",
                                "nodeType": "condition",
                                "nodeId": "cf4d801c-6be2-4663-bcb4-46413e22eec3",
                                "prevId": "44f51bcf-339b-4b90-b4b9-a92b2d29a30a",
                                "isAproval": "",
                                "isEnd": "",
                                "approvalName": "条件内容",
                                "currentStatus": "",
                                "approvalPerson": [],
                                "childrenNode": [],
                                "porperties": {}
                            },
                            {

                                "title": "条件",
                                "nodeType": "condition",
                                "nodeId": "e3866428-af63-4d1d-8b49-57ef575a9563",
                                "prevId": "44f51bcf-339b-4b90-b4b9-a92b2d29a30a",
                                "isAproval": "",
                                "isEnd": "",
                                "approvalName": "条件内容",
                                "currentStatus": "",
                                "approvalPerson": [],
                                "childrenNode": [],
                                "porperties": {}
                            }
                        ]
                    },
                    {
                        "title": "审批人",
                        "nodeType": "approval",
                        "nodeId": "3d75b230-806a-4d29-9020-61a92a18ba7c",
                        "prevId": "a2628bac-80f8-4a90-8085-1c1360efc5e1",
                        "approvalName": "请选择",
                        "isAproval": "",
                        "isEnd": "",
                        "currentStatus": "",
                        "approvalPerson": [],
                        "childrenNode": [],
                        "porperties": {}
                    },
                    {
                        "title": "抄送人",
                        "nodeType": "notifier",
                        "nodeId": "ed353bb3-2100-4e93-9c92-5d60567f51e9",
                        "prevId": "a2628bac-80f8-4a90-8085-1c1360efc5e1",
                        "approvalName": "请选择",
                        "isAproval": "",
                        "isEnd": "",
                        "currentStatus": "",
                        "approvalPerson": [],
                        "childrenNode": [],
                        "porperties": {}
                    },
                    {
                        "title": "抄送人",
                        "nodeType": "notifier",
                        "nodeId": "76ed2c0b-9727-49e2-aae9-0370b939978c",
                        "prevId": "a2628bac-80f8-4a90-8085-1c1360efc5e1",
                        "approvalName": "请选择",
                        "isAproval": "",
                        "isEnd": "",
                        "currentStatus": "",
                        "approvalPerson": [],
                        "childrenNode": [],
                        "porperties": {}
                    },
                    {
                        "title": "抄送人",
                        "nodeType": "notifier",
                        "nodeId": "86f546b8-13c6-474e-9210-bdee48b5ada9",
                        "prevId": "a2628bac-80f8-4a90-8085-1c1360efc5e1",
                        "approvalName": "请选择",
                        "isAproval": "",
                        "isEnd": "",
                        "currentStatus": "",
                        "approvalPerson": [],
                        "childrenNode": [],
                        "porperties": {}
                    },
                    {
                        "title": "抄送人",
                        "nodeType": "notifier",
                        "nodeId": "09e975c2-8e2e-4ea3-b7f6-3f90a6a1e143",
                        "prevId": "a2628bac-80f8-4a90-8085-1c1360efc5e1",
                        "approvalName": "请选择",
                        "isAproval": "",
                        "isEnd": "",
                        "currentStatus": "",
                        "approvalPerson": [],
                        "childrenNode": [],
                        "porperties": {}
                    }
                ],
                "porperties": {}
            },
            {
                "title": "条件",
                "nodeType": "condition",
                "nodeId": "2709995f-1128-498c-9f5c-b99e3a105821",
                "prevId": "ca8f7d0e-c3b5-4d62-81b7-549aadb32691",
                "isAproval": "",
                "isEnd": "",
                "approvalName": "条件内容",
                "currentStatus": "",
                "approvalPerson": [],
                "childrenNode": [],
                "porperties": {}
            },
            {
                "title": "条件",
                "nodeType": "condition",
                "nodeId": "c3d92a75-4d88-40cb-a924-6d363565798e",
                "prevId": "ca8f7d0e-c3b5-4d62-81b7-549aadb32691",
                "isAproval": "",
                "isEnd": "",
                "approvalName": "条件内容",
                "currentStatus": "",
                "approvalPerson": [],
                "childrenNode": [
                    {
                        "title": "分支节点",
                        "nodeType": "branch",
                        "nodeId": "eaa7535f-2836-4ae1-9318-e5a187703285",
                        "prevId": "c3d92a75-4d88-40cb-a924-6d363565798e",
                        "isAproval": "",
                        "isEnd": "",
                        "currentStatus": "",
                        "approvalName": "",
                        "approvalPerson": [],
                        "porperties": {},
                        "childrenNode": [
                            {

                                "title": "条件",
                                "nodeType": "condition",
                                "nodeId": "cc83e818-b0ca-49ac-b099-fa4666b35722",
                                "prevId": "eaa7535f-2836-4ae1-9318-e5a187703285",
                                "isAproval": "",
                                "isEnd": "",
                                "approvalName": "条件内容",
                                "currentStatus": "",
                                "approvalPerson": [],
                                "childrenNode": [],
                                "porperties": {}
                            },
                            {

                                "title": "条件",
                                "nodeType": "condition",
                                "nodeId": "183b5214-fa59-4f48-a6c4-c5d1c9859c6c",
                                "prevId": "eaa7535f-2836-4ae1-9318-e5a187703285",
                                "isAproval": "",
                                "isEnd": "",
                                "approvalName": "条件内容",
                                "currentStatus": "",
                                "approvalPerson": [],
                                "childrenNode": [],
                                "porperties": {}
                            }
                        ]
                    },
                    {
                        "title": "抄送人",
                        "nodeType": "notifier",
                        "nodeId": "a61e69a7-d7e4-48ab-90d9-614c3932db72",
                        "prevId": "c3d92a75-4d88-40cb-a924-6d363565798e",
                        "approvalName": "请选择",
                        "isAproval": "",
                        "isEnd": "",
                        "currentStatus": "",
                        "approvalPerson": [],
                        "childrenNode": [],
                        "porperties": {}
                    },
                    {
                        "title": "分支节点",
                        "nodeType": "branch",
                        "nodeId": "5385f550-104e-432b-89f3-dbe0c003cf30",
                        "prevId": "c3d92a75-4d88-40cb-a924-6d363565798e",
                        "isAproval": "",
                        "isEnd": "",
                        "currentStatus": "",
                        "approvalName": "",
                        "approvalPerson": [],
                        "porperties": {},
                        "childrenNode": [
                            {
                                "title": "条件",
                                "nodeType": "condition",
                                "nodeId": "29308f27-9bb4-47a5-a8e2-7cf5f5ac77d2",
                                "prevId": "5385f550-104e-432b-89f3-dbe0c003cf30",
                                "isAproval": "",
                                "isEnd": "",
                                "approvalName": "条件内容",
                                "currentStatus": "",
                                "approvalPerson": [],
                                "childrenNode": [],
                                "porperties": {}
                            },
                            {
                                "title": "条件",
                                "nodeType": "condition",
                                "nodeId": "591b20e5-7c9a-4a3c-aa8c-d3946a1d2741",
                                "prevId": "5385f550-104e-432b-89f3-dbe0c003cf30",
                                "isAproval": "",
                                "isEnd": "",
                                "approvalName": "条件内容",
                                "currentStatus": "",
                                "approvalPerson": [],
                                "childrenNode": [],
                                "porperties": {}
                            }
                        ]
                    }
                ],
                "porperties": {}
            },
            {
                "title": "条件",
                "nodeType": "condition",
                "nodeId": "702f48be-314e-4f1f-9a9a-77863505bb66",
                "prevId": "ca8f7d0e-c3b5-4d62-81b7-549aadb32691",
                "isAproval": "",
                "isEnd": "",
                "approvalName": "条件内容",
                "currentStatus": "",
                "approvalPerson": [],
                "childrenNode": [
                    {
                        "title": "审批人",
                        "nodeType": "approval",
                        "nodeId": "4ee00ee8-9295-4160-9f9d-40aec436f778",
                        "prevId": "702f48be-314e-4f1f-9a9a-77863505bb66",
                        "approvalName": "请选择",
                        "isAproval": "",
                        "isEnd": "",
                        "currentStatus": "",
                        "approvalPerson": [],
                        "childrenNode": [],
                        "porperties": {}
                    },
                    {
                        "title": "抄送人",
                        "nodeType": "notifier",
                        "nodeId": "4d75d7bf-cc8b-448b-9618-4b604b35d1d7",
                        "prevId": "702f48be-314e-4f1f-9a9a-77863505bb66",
                        "approvalName": "请选择",
                        "isAproval": "",
                        "isEnd": "",
                        "currentStatus": "",
                        "approvalPerson": [],
                        "childrenNode": [],
                        "porperties": {}
                    },
                    {
                        "title": "分支节点",
                        "nodeType": "branch",
                        "nodeId": "54732f8f-6b5b-4495-a73f-8dd19d39c556",
                        "prevId": "702f48be-314e-4f1f-9a9a-77863505bb66",
                        "isAproval": "",
                        "isEnd": "",
                        "currentStatus": "",
                        "approvalName": "",
                        "approvalPerson": [],
                        "porperties": {},
                        "childrenNode": [
                            {
                                "title": "条件",
                                "nodeType": "condition",
                                "nodeId": "049d7879-2875-4af8-8415-dba48bee192c",
                                "prevId": "54732f8f-6b5b-4495-a73f-8dd19d39c556",
                                "isAproval": "",
                                "isEnd": "",
                                "approvalName": "条件内容",
                                "currentStatus": "",
                                "approvalPerson": [],
                                "childrenNode": [],
                                "porperties": {}
                            },
                            {
                                "title": "条件",
                                "nodeType": "condition",
                                "nodeId": "d9218573-3beb-4243-acc8-b52ef4d94430",
                                "prevId": "54732f8f-6b5b-4495-a73f-8dd19d39c556",
                                "isAproval": "",
                                "isEnd": "",
                                "approvalName": "条件内容",
                                "currentStatus": "",
                                "approvalPerson": [],
                                "childrenNode": [],
                                "porperties": {}
                            }
                        ]
                    }
                ],
                "porperties": {}
            },
            {
                "title": "条件",
                "nodeType": "condition",
                "nodeId": "df5cc087-7b39-4cda-a261-8f1327922908",
                "prevId": "ca8f7d0e-c3b5-4d62-81b7-549aadb32691",
                "isAproval": "",
                "isEnd": "",
                "approvalName": "条件内容",
                "currentStatus": "",
                "approvalPerson": [],
                "childrenNode": [
                    {
                        "title": "抄送人",
                        "nodeType": "notifier",
                        "nodeId": "be443051-2045-4054-9747-b7123010aead",
                        "prevId": "df5cc087-7b39-4cda-a261-8f1327922908",
                        "approvalName": "请选择",
                        "isAproval": "",
                        "isEnd": "",
                        "currentStatus": "",
                        "approvalPerson": [],
                        "childrenNode": [],
                        "porperties": {}
                    },
                    {
                        "title": "审批人",
                        "nodeType": "approval",
                        "nodeId": "980c8e3c-043b-4bca-983a-5e6aedeaee28",
                        "prevId": "df5cc087-7b39-4cda-a261-8f1327922908",
                        "approvalName": "请选择",
                        "isAproval": "",
                        "isEnd": "",
                        "currentStatus": "",
                        "approvalPerson": [],
                        "childrenNode": [],
                        "porperties": {}
                    },
                    {
                        "title": "分支节点",
                        "nodeType": "branch",
                        "nodeId": "e29b57e5-4108-496e-8fe7-34f566ec84b2",
                        "prevId": "df5cc087-7b39-4cda-a261-8f1327922908",
                        "isAproval": "",
                        "isEnd": "",
                        "currentStatus": "",
                        "approvalName": "",
                        "approvalPerson": [],
                        "porperties": {},
                        "childrenNode": [
                            {
                                "title": "条件",
                                "nodeType": "condition",
                                "nodeId": "48b8ad34-eb02-4a55-88f9-d771db06f804",
                                "prevId": "e29b57e5-4108-496e-8fe7-34f566ec84b2",
                                "isAproval": "",
                                "isEnd": "",
                                "approvalName": "条件内容",
                                "currentStatus": "",
                                "approvalPerson": [],
                                "childrenNode": [],
                                "porperties": {}
                            },
                            {
                                "title": "条件",
                                "nodeType": "condition",
                                "nodeId": "1bfbc2bd-3b9a-4410-a736-610ba42f722a",
                                "prevId": "e29b57e5-4108-496e-8fe7-34f566ec84b2",
                                "isAproval": "",
                                "isEnd": "",
                                "approvalName": "条件内容",
                                "currentStatus": "",
                                "approvalPerson": [],
                                "childrenNode": [],
                                "porperties": {}
                            }
                        ]
                    }
                ],
                "porperties": {}
            },
            {
                "title": "条件",
                "nodeType": "condition",
                "nodeId": "f6dad94d-58e2-403d-b52c-980eb164a19e",
                "prevId": "ca8f7d0e-c3b5-4d62-81b7-549aadb32691",
                "isAproval": "",
                "isEnd": "",
                "approvalName": "条件内容",
                "currentStatus": "",
                "approvalPerson": [],
                "childrenNode": [],
                "porperties": {}
            }
        ]
    }
];
export default mockNodeData;