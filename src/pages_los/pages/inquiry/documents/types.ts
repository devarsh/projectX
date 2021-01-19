export interface GroupItemType {
  docID: string;
  docLabel: string;
  docDescription?: string;
  status: string; //N-not uploaded P-Uploaded V-Verified R-Rejected
}

export interface GroupType {
  groupName: string;
  groupLabel: string;
  items: GroupItemType[];
}
