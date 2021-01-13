## Ratnafin Project

This repositroy contains code for Ratnafin LOS Project.

# Raatnafin Organization Chart

graph TD
A[Management] -->|Collection of Locations makes|B
B[Branches] -->|has many|C
C[Vertical Heads]  
 C -->|has many| E(BDM)
C -->|has many| F(Credit Head)
E -->|has many| G(BDE)
F -->|has many| H(Credit Associate)

# Lead Flow of Channel Partner

sequenceDiagram
Participant Partner
Participant BDE
Participant BDM
Participant VH
Participant CreditHead
Participant CreditAssoicate

Partner ->> BDE : Lead of partner under BDE
BDE -->> BDM : Auto assigned
BDM -->> VH : Auto assigned
VH -->> CreditHead: Assigns to credit head
CreditHead -->> CreditAssoicate : assignment Optional

Partner ->> BDM : Lead of partner under BDM
BDM -->> BDE : assignment Optional
BDM -->> VH : Auto assigned
VH -->> CreditHead: Assigns to credit head
CreditHead -->> CreditAssoicate : assignment Optional

Partner ->> VH : Lead of partner under Raatnafin
VH -->> BDM : assigns
BDM -->> BDE : can assign
VH -->> CreditHead: Assigns to credit head
CreditHead -->> CreditAssoicate : assignment Optional

# Lead Flow of Customer, Cross Lead, Management, here denoted as X

sequenceDiagram
Participant X
Participant BDE
Participant BDM
Participant VH
Participant CreditHead
Participant CreditAssoicate

X ->> VH : Lead of reaches to Raatnafin
VH -->> BDM : assigns
BDM -->> BDE : can assign
VH -->> CreditHead: Assigns to credit head
CreditHead -->> CreditAssoicate : assignment Optional

# Lead flow for Employee

sequenceDiagram
Participant Employee
Participant BDE
Participant BDM
Participant VH
Participant CreditHead
Participant CreditAssoicate

Employee ->> BDE : If Employee is BDE
BDE -->> BDM : Auto assigned
BDM -->> VH : Auto assigned
VH -->> CreditHead: Assigns to credit head
CreditHead -->> CreditAssoicate : assignment Optional

Employee ->> BDM : If Emplyee is BDM
BDM -->> BDE : assignment Optional
BDM -->> VH : Auto assigned
VH -->> CreditHead: Assigns to credit head
CreditHead -->> CreditAssoicate : assignment Optional

Employee ->> VH : If Employee is VH or cross
VH -->> BDM : assigns
BDM -->> BDE : can assign
VH -->> CreditHead: Assigns to credit head
CreditHead -->> CreditAssoicate : assignment Optional
