# From Basics to Advanced: From Solidity Smart Contracts to System Development

Author：Chen, Pin-Yang(@YangIsCoding)

*Data Streaming and Functionality of Accounting and Auditing Smart Contracts Based on Isuncloud

*Not just learning another programming language but also developing smart contract systems*

![image](https://github.com/CAFECA-IO/KnowledgeManagement/assets/59311328/e1b855c4-749a-41bc-8e68-63221ce8df2e)

## Introduction
In today’s rapidly evolving digital world, blockchain technology has become a key force in driving transparency, security, and decentralization. Among these advancements, smart contracts play a central role in this revolution. They not only reshape our understanding of transactions and data interactions but also bring endless possibilities to various industries. In this context, we will explore a unique smart contract system—the Dynamic Transaction Processing Contract, aimed at effectively managing and recording diverse transactions.

In this article, we will delve into the core components of this dynamic transaction processing contract and analyze its operational principles. We will explore the topic in a step-by-step manner, from basic to advanced, guiding you through the allure of blockchain technology.

## Reading Goals
In this article, I will cover the following topics, gradually introducing you to system development concepts:

1. Basic Solidity syntax
2. Ways to optimize smart contracts
3. Methods for ensuring reliability, scalability, and maintainability
4. Isuncloud's accounting system
5. Interacting with blockchain through backend integration
6. Converting objects into digital assets
7. Data streaming

Just to record my learning journey and hope to do a little impact on the Ethereum community.

## Contents
- Introduction
- Basics
- Smart Contracts for Transaction Recording
- Setting Time Intervals and Generating Reports
- Storing and Calculating Report Fields
- Interfaces, Inheritance, Overriding, Abstraction
- Routers
- Interaction and Monitoring with Blockchain
- Database and APIs
- Reports and Tokens
- Conclusion, References, and Source Code

## Introduction

This article will use the existing smart contract system (Isuncloud Auditing System) that I have developed to explain and introduce its concepts, extracting key concepts of smart contracts from it, including data-intensive system design concepts, registration patterns, factory patterns, modularization, reentrancy defense, and more. The goal is to not only familiarize readers with the Solidity language but also to provide a comprehensive understanding of smart contract system development through this article.

If you want to explore it yourself:：[Here is the source code for the entire system.](https://github.com/CAFECA-IO/auditing_system/tree/develop)，You can follow the instructions in the README.md to operate the system.

#### Smart Contracts
Before we dive in, let’s review the basic conditions that a traditional contract must meet:

1. **Party Information**: Details of Party A and Party B.
2. **Contract Terms**: Business logic that both parties must adhere to.
3. **Contract Duration**: The period during which the contract is valid.
4. **Immutability**: Once the contract is signed, each party holds a copy. Any future modifications require drafting a new contract and invalidating the old one.

In addition to these basic conditions, there might be other supplementary terms, such as payment methods and acceptance criteria.

Now, if we want to automate the entire contract process, what do we need to do?

1. We need a platform where both parties have accounts. These accounts should be identifiable and secure to prevent misuse, ensuring that the contract is recognized as valid.
2. We need to write code to handle the business logic of the contract. The code ensures that once the contract is signed, no one can modify it arbitrarily.
3. Since some companies use checks for payment, we need services similar to banking to ensure that checks can be cashed.

Basically, this is the fundamental framework of smart contracts (excluding knowledge of ABI, EVM, digital signature algorithms, cryptography, etc.).

So, the characteristics of smart contracts can be summarized as follows:

```

1. Automated Execution: Smart contracts can automatically perform specific operations, such as calculations, storage, and data processing, without the need for intermediaries.

2. Data Immutability and Security: Once a smart contract is deployed on the blockchain, its code cannot be altered, ensuring transparency and immutability of the data. This is a crucial feature for accounting systems, as it guarantees the accuracy and reliability of records.

3. Access Control and Report Access: Smart contracts can be used to manage access permissions to financial reports, ensuring that only authorized users can view or modify these reports.

4. Cost of Data Writing: Deploying and operating smart contracts may incur costs in virtual currency due to issues such as network fees and business considerations.

5. No Fixed Host Required: When deploying traditional programs, we typically run them on a server that never shuts down. However, smart contracts operate on the Ethereum network through numerous nodes, rather than relying on a single host.

```

#### Isuncloud Auditing System

The core of an accounting system is to allow users to input data, perform calculations on this data, and generate reports. Is that all? Clearly, we need to consider more rigorously the issues that such a simple design might face.

```
1. How does the system differentiate between various transaction types and determine what calculations need to be performed?

2. Based on the first point, smart contracts on the blockchain are immutable unless a programmer has implemented a self-destruct function within the smart contract. If we use traditional if-else statements to instruct the smart contract that, for example, if data type equals 1 it represents a withdrawal and if it equals 2 it represents a deposit, then if we need to implement a new transfer feature in the future, we would have to rewrite the smart contract, redeploy it, and all previous data would be lost.

3. A report often covers a specific time period, such as a quarterly or annual report for a tech company, or even a report from the company’s inception to the present. We need a mechanism to define the financial status within this time frame.

4. I need to manage which users have the authority to access the reports.
```
**Therefore, the data flow of the Isuncloud accounting system is as follows (the following is a simplified version; a more detailed introduction will be provided in the subsequent sections)：**

```
1. First, we need to let the system know which transaction types are required. For example, if we need a "Deposit" function, we should introduce this function to the system to avoid using if-else statements. Let’s call it "Deposit" (which includes data storage, finding "Deposit" transactions within the time frame, and calculating this transaction field).

2. Therefore, we need to write a "Deposit" smart contract and then register this contract with the system (the system needs to have a registration function implemented beforehand).

3. Next, we agree with the users that the input data (array) will have the following structure: the first element is the transaction ID, the second element is the transaction type ("Deposit"), and the remaining elements include the deposit amount, transaction fees, etc.

4. The system determines the transaction type (great, the second element is "Deposit"). Once this is confirmed, the data can be stored in the recently deployed Deposit smart contract.
```
**So far, our transaction data has been stored. Next, we need to proceed with the report generation process.**

```
1. We need a mechanism to set the exchange rate at the time of generating the report (since the current exchange rate when generating the report may differ from the exchange rate at the time of transaction input) and assign an ID to the report being generated at that moment (which can be understood as the primary key).

2. The system requests all transactions within the "Deposit" smart contract and filters them based on the time frame. It then returns the event IDs within this period to "Deposit." The "Deposit" contract, which contains all the data for a specific event ID, performs the necessary calculations and generates a report (this report also has a report ID for future access control and queries).
```
**Great, we have now generated the report. The Isuncloud system allows us to read this report in several ways.**

```
1. Direct Manual Call to Smart Contract Functions: If we have successfully deployed the system, we only need the address of the smart contract. In Remix, we can directly input this address and use the read functions to retrieve the data.

2. Backend Scripts Provided by Isuncloud: The Isuncloud system allows users to operate their pre-written scripts to communicate with the blockchain and fetch data back to the local database.

3. Calling the Server: You can request the server URL to call the report API from the local database and display it on the frontend page.
```
So far, we have ignored certain aspects such as data types (which are crucial for gas fee control), access control, the generation of report NFTs (ERC-8017), and reentrancy attack defenses. For now, we only need to understand some basic concepts.

## basics

Alright, let’s get started. In this chapter, we will begin with the basics. You can find the source code for this chapter at the following link:[Transaction Contract](https://github.com/CAFECA-IO/auditing_system/blob/develop/src/services/blockchain/contracts/transaction_contract.sol)，click on it and follow the code step by step!

### License Type

SPDX (Software Package Data Exchange) is a standard format used to express software package license information. SPDX license identifiers provide a concise way to clearly specify the software license in source code files.

The MIT License is a permissive license that allows users to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software with very few restrictions. The only requirement is that all copies must include the copyright notice and the license statement.

```python
// SPDX-License-Identifier: MIT
```

### Setting Up the Compiler

```python
pragma solidity ^0.8.0;
```
pragma: This is a general programming term used to provide specific instructions to the compiler.

^0.8.0: This part specifies the compiler version. Here, the ^ symbol denotes "compatible with." So, this line means that the contract should be compiled with a Solidity version of at least 0.8.0 but less than the next major version, 0.9.0. This ensures that the contract can take advantage of new features and fixes in the 0.8.x versions while avoiding potential incompatibilities introduced by using a higher major version number.

### Events
In Ethereum, events are used to notify internal state changes within a contract. These events are recorded in the blockchain’s logs and can be monitored and processed by external listeners (e.g., Web3.js, ethers.js). In simple terms, events are a way to emit custom notifications.

```python
event transactionAdded(bytes32 transactionType);
```

When the thread reaches the desired location, write the event to the log.

```python
function addRecord(bytes32[] memory data) public noReentrancy{
        ...
        emit transactionAdded(transactionType);
        ...
    }
```

### Mapping
A mapping is a data structure that associates keys with values. In this contract, it is used to store parameters for each transaction. It largely replaces traditional arrays by allowing direct access to values associated with keys, rather than searching through an array, similar to dictionaries in Python. Mappings are common in Solidity, but note that Solidity does not support using structs (structures) as parameters (whether as keys or values). You can define a mapping using the following syntax (I’ll use string instead of bytes32 for better understanding):

```python
 mapping(string => bool) private recordedEvents;
```

```python
function addRecord(string[] memory data) public noReentrancy{
        ...
        recordedEvents[eventId] = true;
    }
```

If a transaction is added, the system sets this transaction to true to prevent the same eventId from being added again in the future.

### Structure
A struct allows developers to create custom data types that can contain multiple different types of data. In this contract, the Transaction struct is used to represent a transaction. Sometimes, structs are defined under an interface, which we will discuss later. You can define a struct using the following syntax:

```python
struct Transaction {
    bytes32 eventId;
    bytes32 transactionType;
    address recorder;
    mapping(bytes32 => int256) params;
}
```

 ### Visibility Modifier
 Visibility modifiers are an important concept used to specify the range of access for functions and variables within a contract. They include **public**, **private**, **internal**, and **external**.

 1. public: This is the most open visibility level. Functions and variables marked as public can be accessed both within the contract and through transactions or calls from outside the contract. For variables, Solidity automatically creates a **getter** function for public variables, allowing external access to these variable values.

 2. private: This is the most restrictive visibility level. Functions and variables marked as private can only be accessed within the contract where they are defined. Even derived contracts cannot access private functions and variables.

 3. internal: This modifier is similar to private, but it allows derived contracts to access internal functions and variables. This is particularly useful during contract inheritance, as it enables derived contracts to access and reuse functions and variables from the base contract.

 4. external: This modifier is designed specifically for external calls. external functions can only be called from outside the contract and cannot be called internally (unless through the this keyword). This is often used to reduce gas costs for certain types of calls, as external functions can directly access calldata, which is a more gas-efficient data storage method compared to memory.

You can add these modifiers when defining functions:

 ```python
 function registerHanlder(params) external {
        ...
    }
 ```


### Interface

An interface is a special type of contract used to define how contracts interact with each other. Interfaces are similar to abstract classes in traditional programming languages; they only define the external functions without including implementation details. These functions are later implemented in other contracts. Through interfaces, Solidity allows for the creation of loosely coupled systems (which will be discussed later), enabling different contracts to interact with each other without needing to know the internal details of each other. Note that interfaces cannot define constructors.

It typically looks like [i_transaction_handler.sol](https://github.com/CAFECA-IO/auditing_system/blob/develop/src/services/blockchain/interfaces/i_transaction_handler.sol):

```python
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ITransactionHandler {
    function processTransaction(bytes32[] memory data, address recorder) external;
    function getEventIdAndRate(bytes32 _eventId,bytes32 _reportID ,bytes32 _SP002, bytes32 _SP003, bytes32 _SP004) external;
}
```
Use
```python
import "../interfaces/i_transaction_handler.sol";
```

to import smart contract interface

```python
mapping(bytes32 => ITransactionHandler) private handlers;
```

Define this interface as a value in a mapping (meaning different keys will correspond to different instantiated interfaces).

```python
function addRecord(bytes32[] memory data) public noReentrancy{
        ...
        ITransactionHandler handler = handlers[transactionType];
        ...
    }
```
Pass the value of handlers[transactionType] to an instantiated interface handler.

This way, we only need to implement the functionality of the handler. The implementation involves directly importing a specific handler smart contract, such as Deposit. For example, you can see the Deposit contract, which implements the processTransaction() and getEventIdAndRate functions. It inherits from ITransactionHandler and uses override to override the interface methods.

### Condition Checking

Of course, we need some checking mechanisms to ensure that the smart contract meets our expectations from start to finish. The require statement checks whether the given condition is true. If true, the execution continues; if false, it reverts the entire transaction. However, the gas fee consumed will not be refunded. It’s particularly important to note that triggering a revert is relatively costly.

```python
require(data.length >= 3, "Data must have at least three elements");
```

###  modifier

We can add custom modifiers to functions, for example（the following example is not included in[Transaction Contract](https://github.com/CAFECA-IO/auditing_system/blob/develop/src/services/blockchain/contracts/transaction_contract.sol)）：

```python
modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
```
In this context, msg.sender is the address calling the function, and owner is the owner of the contract (which can be the deployer, but the deployer can set other addresses with ownership permissions).

So, this statement means that if you are not the contract owner, you cannot use this function. Note that the modifier also needs:
```python
_;
```
This tells the smart contract that this is a modifier and begins executing the modified function.

```python
function restrictedFunction() public onlyOwner {
        // Code that can only be executed by the owner
    }
```
By adding this modifier to a custom function, you can implement this access control feature.

### Constructor

The constructor is a special type of function that executes once and only once when the contract is deployed to the Ethereum blockchain. The main purpose of the constructor is to perform initial setup of the contract, such as setting initial variable values, executing startup logic, or configuring necessary states.

A contract can contain at most one constructor. If a constructor is not explicitly defined, the contract will have no initialization process by default.

Operations typically performed in a constructor include setting the contract owner, initializing the contract's state variables, and performing basic configuration checks.

Additionally, constructor is the only function that does not require a visibility modifier (such as public or private) because it is inherently public. It automatically executes during the contract deployment process.

The constructor is executed only once during the contract deployment. Once the contract is deployed on the blockchain, the constructor cannot be called or accessed again.

```python
  constructor(address _parser) {
        Iparser = IParser(_parser);
    }
```
In the above example, we instantiate **IParser** using the constructor. This approach is commonly used to establish dependencies between smart contracts.

We use the address of the parser smart contract, which has already been deployed on the blockchain, to establish this dependency. In simple terms, if I want to use the functions of the smart contract at this address, I need to provide the address to access it.

### bytes32

If you closely examine this smart contract, you will see that it uses many **bytes32** data types. The reason is that bytes32 is a commonly used data type for storing fixed-length byte sequences. This data type is very useful in various scenarios, especially when you need to efficiently store and transmit short pieces of data, such as status codes, identifiers, or key hashes. Compared to using dynamic-sized bytes or string types, bytes32 can be more gas-efficient because it occupies a fixed amount of storage space.


## Smart Contracts for Transaction Recording

### Preventing Reentrancy Attacks

Reentrancy is considered one of the most devastating attack techniques in smart contracts (e.g., the DAO attack on Ethereum in 2016). This attack technique can completely compromise a contract or steal valuable information. Reentrancy attacks can occur when a function makes an external call to another contract. The following code snippet demonstrates how such an attack can be executed. This vulnerability allows attackers to perform recursive callbacks to the main function, creating an unintended loop that repeats multiple times. For example, when a vulnerable contract includes a withdrawal function, the contract could be exploited to repeatedly call the withdrawal function, draining any available balance. Single-function and cross-function reentrancy attacks are two different types that attackers can exploit. This vulnerability enables attackers to use external calls to perform unexpected tasks.

Let's consider the following vulnerable contract, which acts as a vault allowing users to withdraw 1 Ether per week.

```python
contract EtherStore{
        uint256 public withdrawalLimit = 1ether;
        mapping(address => uint256) public lastWithdraTime;
        mapping(address => uint256) public balances;
    
        function depositFunds() public payable{
            balances[msg.sender] += msg.value;
        }
    
        function withdrawFunds(uint256 _weiToWithdraw) public {
            require(balances[msg.sender] >= _weiToWithdraw);
            //limit the withdrawal
            require(_weiToWithdraw <= withdrawalLimit);
            //The following line has a vulnerability. Please try to think about what might be unreasonable.
            require(now >= lastWithdrawTime[msg.sender] + 1 weeks);
            balances[msg.sender] -= _weiToWithdraw;
            lastWithdrawTime[msg.sender] = now;
        }
    
    }
```

If an attacker creates a malicious contract as follows

```python
import "EtherStore.sol";
    
    contract Attack{
        EtherStore public etherStore;
    
        constructor( address _etherStoreAddress) {
            etherStore = EtherStore(_etherStoreAddress);
        }
    
        function attackEtherStore() public payable{
        
            //attack to the nearest ether
            require(msg.value >= 1 ether);
            
            //send eth to the depositFunds() function
            etherStore.depositFunds.value(1 ether)();
    
            //the gane begins
            etherStore.withdrawFunds(1 ether);
        
        }
    
        function collectEther() public{
            msg.sender.transfer(this.balance);
        }
    
        //fallback function - where the magic starts
        function() payable{
            if(etherStore.balance > 1 ether){
                etherStore.withdrawFunds(1 ether);
            }
        
        }
    
    }
```

Let's break it down:
```
1. The attacker first deploys the EtherStore contract. Then, the attacker deploys the Attack contract, specifying the address of the EtherStore contract in the constructor. This allows the Attack contract to interact with the EtherStore contract.


2. The attacker initiates the attack by calling the attackEtherStore() function of the Attack contract. This function first requires the attacker to send at least 1 Ether to the Attack contract. The attackEtherStore() function then calls the depositFunds() method of the EtherStore contract to deposit this 1 Ether into the EtherStore contract. Immediately after, the attackEtherStore() function calls the withdrawFunds() method of the EtherStore contract, attempting to withdraw 1 Ether.


3. When the EtherStore contract processes the withdrawal request, it sends 1 Ether back to the Attack contract. Since Ether transfer automatically triggers the fallback function of the Attack contract, this fallback function is executed.


4. Reentrancy attack in the fallback function: In the fallback function of the Attack contract, if it detects that the balance of the EtherStore contract is still greater than 1 Ether, it will call the withdrawFunds() method of the EtherStore contract again. The key issue is that EtherStore contract sends Ether before updating the user's balance and last withdrawal time. This allows the Attack contract to repeatedly withdraw funds within the same transaction.


5. Each time the fallback function of the Attack contract is triggered, it checks the balance of the EtherStore and attempts to withdraw funds again. This loop continues until the EtherStore’s balance is insufficient to continue the withdrawal.


6. Once the EtherStore’s balance is insufficient to continue the withdrawal, the fallback function of the Attack contract stops executing. The attacker can then call the collectEther() function of the Attack contract to transfer all the funds extracted from the EtherStore contract to their own account.
```

Here are three methods to prevent this type of attack on the contract:

```
1. Using Solidity’s native transfer function to send Ether to an external contract is effective because the transfer function provides a fixed gas stipend of 2300 gas for the external call. This amount of gas is insufficient to allow the recipient contract to perform additional calls to other contracts.

2. Use the "Check-Effects-Interactions" pattern to ensure that all state modifications are performed before sending Ether to other contracts.

3. Introduce a mutex by adding a state variable to lock the contract during execution to prevent reentrancy attacks.
```

Back to our system example, we use a mutex to enhance the contract's defensive capabilities.

```python
 bool private locked;

 modifier noReentrancy() {
        require(!locked, "Reentrancy not allowed");
        locked = true;
        _;
        locked = false;
    }

function addRecord(bytes32[] memory data) public noReentrancy{
    ...
}
```

Details are as follows:

```
1. locked State Variable: The contract includes a private boolean variable named locked. This variable is used to track whether the contract is in a locked state.

2. noReentrancy Modifier: This modifier first checks if locked is false (i.e., the contract is not currently locked). If it is locked, the execution is refused and an error message "Reentrancy not allowed" is shown. If it is not locked, the modifier sets locked to true, executes the function modified by the modifier, and then sets locked back to false.

3. Using the Modifier: In this contract, the addRecord function uses the noReentrancy modifier. This means that when addRecord is called, it first checks if the contract is already locked. This prevents re-entry (reentrancy) into the addRecord function due to external calls or event triggers during its execution.

4. By locking the contract during function execution, it prevents re-entry attacks where external calls might lead to re-calling the original contract function. This ensures consistency in the contract's state and prevents potential attacks.
```
### Reliability, Scalability, and Maintainability

In this chapter, we will discuss some system design concepts and then start explaining them with specific code examples.

#### Reliability

When discussing software reliability, especially in the context of errors and failures, reliable code should have the following characteristics: it should correctly perform the intended functions, handle user errors or unusual usage, and maintain performance under load and varying data volumes. Additionally, it should prevent unauthorized access and misuse. Reliability can be understood as **the system's ability to continue operating properly even when issues arise, or to promptly prevent more severe errors from occurring**. Finally, as we all know, prevention is better than cure.

Great! In our smart contract, we use the following methods to achieve this characteristic:
```

1. NoReentrancy Modifier (Anti-Reentrancy Modifier): As mentioned earlier, you already know how to use it!

2. Condition Checks: Use many require statements, such as checking data length and event ID uniqueness in addRecord, ensuring handlers are not already registered in registerHandler, and so on. These checks help prevent issues caused by invalid or malicious inputs.

3. Event Logging: By using events (such as transactionAdded), the contract provides transparency for critical operations and helps with debugging and tracing when issues arise.

4. Data Encapsulation: By using private and public keywords, the contract specifies which state variables and functions are internal and which are externally accessible. This encapsulation helps protect critical data and reduces the risk of external interference.

5. Handling Not Found Cases: In the findTransaction function, if no matching transaction is found, the contract uses revert to cancel the operation and produce an error. This practice helps prevent the use or processing of incorrect data.

6. Address Verification (isContract): By checking whether an address is a contract, this helps avoid certain types of malicious behavior, such as preventing potential risks when interacting with non-contract entities.

7. Constructor Initialization: The contract initializes key state variables (such as Iparser) in the constructor, which helps ensure that the contract is in a consistent and expected state from the beginning.
```

#### Scalability

Scalability is the characteristic of a system, network, or program to appropriately adjust and maintain or enhance performance when faced with increasing load. This includes increasing hardware resources, such as enhancing CPU or memory, as well as improving software architecture to support more users or larger data volumes. Scalability can specifically manifest in two forms: vertical and horizontal.

1. **Vertical Scalability**: also known as Scaling Up, refers to expanding by enhancing the performance of a single node (e.g., a server), such as increasing its processor speed or memory capacity.

2. **Horizontal Scalability**: or Scaling Out, involves adding more nodes, such as increasing storage structures, to distribute the load and improve overall system performance.

How we make into practice:

```python
struct Transaction {
        bytes32 eventId;
        bytes32 transactionType;
        address recorder;
        mapping(bytes32 => int256) params;
    }

Transaction[] public transactions;

function addProcessedTransaction(
        ...
    ) external {
        ...
        uint256 index = transactions.length;
        transactions.push();
        Transaction storage transaction = transactions[index];
        ...
    }
```

```
Use Dynamic Data Structures: Utilize dynamic arrays (e.g., transactions) to store transaction data. This structure can expand as the number of transactions increases.
```

### Maintainability

It is well known that the majority of software costs are not incurred during the initial development phase, but rather during the ongoing maintenance phase. This includes fixing bugs, keeping the system running, investigating failures, adapting to new platforms, modifying for new scenarios, repaying technical debt, and adding new features.

Unfortunately, many people in the software industry dislike maintaining so-called legacy systems—perhaps due to dealing with fixing others' mistakes, working with outdated platforms, or the system being forced to handle extraneous tasks. Every legacy system has its own way of being problematic, making it difficult to provide a one-size-fits-all solution for dealing with them.

However, we can and should design software in a way that considers reducing maintenance pain as much as possible from the outset, thus avoiding turning our software systems into legacy systems.

Next, I will explain two ways to improve maintainability.

#### Registration Pattern

Imagine a gaming console where you must register your game controllers when you first purchase it, so that you can use them for playing games in the future. However, this registration function can only be executed once. This means that after you bring it home, you cannot register new controllers for multiplayer gaming. Therefore, if you want to play multiplayer games, the only option is to buy a console and register two controllers at once.

Do you get the idea? This is similar to the characteristics of blockchain. Once a smart contract (the console) is deployed, it cannot be modified. If you want to integrate other smart contracts afterward, you would have to redeploy the entire system.

This clearly doesn't make sense. The flaw lies in the fact that the console does not have a registration mode. We need to design a system where the smart contract can register other contracts. This way, if we want to extend functionality, we only need to deploy the new contract to the blockchain, get the contract address, and register this address in the original smart contract for interaction.

Let's look at the code:

```python
function registerHanlder(bytes32 transactionType, ITransactionHandler handler) external {
        require(handlers[transactionType] == ITransactionHandler(address(0)), "Handler already registered");
        handlers[transactionType] = handler;
    }

function addRecord(bytes32[] memory data) public noReentrancy{
        ...
        bytes32 transactionType = data[1];
        ITransactionHandler handler = handlers[transactionType];
        require(address(handler) != address(0), "Transaction type handler not registered");
        handler.processTransaction(data, msg.sender);
        emit transactionAdded(transactionType);
        ...
    }
```

```
1. registerHandler Function: Implementation: By calling the registerHandler function, we can associate a specific transactionType with a handler. Internally, the contract uses a mapping (handlers) to store this information, where the key is the bytes32 identifier of the transaction type, and the value is the corresponding ITransactionHandler interface instance.

2. With the registration done above, we have linked the handler contract to the transaction type. When we later call addRecord, the system will read the transaction type. For example, if it reads "Deposit", it will delegate the subsequent tasks to the DepositHandler.sol contract (the line handler.processTransaction(data, msg.sender);), which will handle data storage or compute deposit report fields.
```

#### Factory Pattern

Imagine you have a toy factory (this represents the "factory contract" in a smart contract), and this factory can produce many identical toy cars (these toy cars are the "instance contracts"). The factory has a special machine that, whenever you press a button, produces a brand-new toy car. In this example, the button is like a function in the factory contract. Each time you press it, you create a new smart contract (toy car). Every toy car is the same, with wheels, a steering wheel, and seats. In smart contracts, this means that each created instance contract has the same basic characteristics and functionalities. Only the factory owner or other authorized persons can modify individual toy cars.


```python
contract InstanceContract {
    uint public data;
    address public owner;

    event DataChanged(uint newData);

    constructor(uint _data) {
        owner = msg.sender;
        data = _data;
    }

    function setData(uint _data) public {
        require(msg.sender == owner, "Only owner can change data");
        data = _data;
        emit DataChanged(_data);
    }
}

contract FactoryContract {
    event ContractCreated(address contractAddress);

    function createInstanceContract(uint _data) public {
        InstanceContract newInstance = new InstanceContract(_data);
        emit ContractCreated(address(newInstance));
    }
}

```

In this example, the InstanceContract contract includes data management logic and permission control, ensuring that only the creator of the contract can modify the data. The FactoryContract, in addition to creating instance contracts, also emits an event that records the address of each created contract on the blockchain. This helps in tracking and verifying activities within the system.

## Setting Time Intervals and Generating Reports

Codes of this section：[set time span contract](https://github.com/CAFECA-IO/auditing_system/blob/develop/src/services/blockchain/contracts/get_transaction_time_span.sol)

In the accounting system of isuncloud, we can consolidate transaction data stored on the blockchain into reports. First, we need to set the desired time range, and then define the name of the report (which serves as the primary key).

### Set the current exchange rate and the report key (which is different from the transaction key).

```python
 function setRate(bytes32 _SP002, bytes32 _SP003, bytes32 _SP004, bytes32 _reportName)external {
        require(!usedReportIDs[_reportName], "Report ID already used");
        Settlement memory newRate = Settlement({
            SP001 : int256(block.timestamp),
            SP002: _SP002,
            SP003: _SP003,
            SP004: _SP004,
            reportName: _reportName
        });
        usedReportIDs[_reportName] = true;
        rateHistory.push(newRate);
    }
```

We all know that a report may include the sum of several transactions, and each type of transaction has its own key. Therefore, we must design a key for the report as well (let’s assume it is called: the_first_report). This key will then allow us to look up the report named the_first_report. (The functionality for querying reports involves both the client-side and development-side, leveraging the capabilities of NFTs to create different permissions for both parties, which will be discussed in later chapters.)

Now, why set the current exchange rate along with the report key?

1. When entering transaction data, there is an exchange rate (t1), e.g., 1 Ether = 70,000 TWD. However, a week later (t2), the exchange rate changes to 1 Ether = 80,000 TWD.

Which exchange rate should be used for the report?

2. Clearly, the report should use the exchange rate at the time of its creation (t2), and it would be best if the report could also calculate the exchange rate gains or losses incurred during this period.

### Set the time interval and perform a transaction key query.

```python

struct Settlement {
        int256 SP001;
        bytes32 SP002;
        bytes32 SP003;
        bytes32 SP004;
        bytes32 reportName;
    }

function filterTransactionsInRange(int256 startTime, int256 endTime, bytes32 _reportName)
        external
        returns (FilteredData memory)
    {
       ...

        uint256 resultCount = 0;
        for (uint256 i = 0; i < count; i++) {
            int256 transTime = transactionContract.getTransactionTime(i);
            if (transTime >= startTime && transTime <= endTime) {
                types[resultCount] = transactionContract.getTransactionType(i);
                eventIds[resultCount] = transactionContract.getTransactionEventId(i);
                transTimes[resultCount] = transTime;
                resultCount++;
            }
        }

        bytes32[] memory filteredTypes = new bytes32[](resultCount);
        bytes32[] memory filteredEventIds = new bytes32[](resultCount);
        int256[] memory filteredTransTimes = new int256[](resultCount);

        for (uint256 i = 0; i < resultCount; i++) {
            filteredTypes[i] = types[i];
            filteredEventIds[i] = eventIds[i];
            filteredTransTimes[i] = transTimes[i];
        }

        FilteredData memory data = FilteredData({
            types: filteredTypes,
            eventIds: filteredEventIds,
            transTimes: filteredTransTimes,
            reportCreater: reportCreater,
            reportName: _reportName
        });

        processFilteredTransactions(data);
        return data;
    }

    function processFilteredTransactions(FilteredData memory data) internal {
        Settlement memory latestRate = rateHistory[rateHistory.length - 1];

        for (uint256 i = 0; i < data.types.length; i++) {
            ITransactionHandler handler = transactionContract.getHandler(data.types[i]);
            require(address(handler) != address(0),"handler not exist");

            handler.getEventIdAndRate(data.eventIds[i], data.reportName ,latestRate.SP002, latestRate.SP003, latestRate.SP004);
            emit TransactionProcessed(data.reportName, data.types[i]);

        }
    }
```

as we can see：
```
handler.getEventIdAndRate(data.eventIds[i], data.reportName ,latestRate.SP002, latestRate.SP003, latestRate.SP004);
```
In this code, we only need to pass the eventId to the handler because we don't need to send the entire data (which might include deposit amounts, fees, current exchange rate (t1), etc.) to the handler. Once we have the eventId, we can refer back to the data under that eventId at any time. This design helps avoid the high gas fees associated with transferring large amounts of data between smart contracts.

Additionally, we also pass in the reportName (i.e., the report key). After the handler has performed its calculations, the results can be stored under this report for future reference.
## Storing and Calculating Report Fields (handler)

Code of this section：[handler](https://github.com/CAFECA-IO/auditing_system/blob/develop/src/services/blockchain/contracts/e00010001_handler.sol)

The isuncloud handler has two main functions:

1. Store events and the current exchange rate at the time of setting.

2. Calculate the report.

storing event:
```python
 function processTransaction(bytes32[] memory data, address recorder) external override {

        require(data.length == 6, "Data length for E00010001 must be 6");

        bytes32[] memory paramKeys = new bytes32[](5);
        int256[] memory paramValues = new int256[](5);

        paramKeys[0] = Iparser.stringToBytes32("EP001");
        paramValues[0] = int256(uint256(data[2]));
        paramKeys[1] = Iparser.stringToBytes32("EP002");
        paramValues[1] = int256(uint256(data[3]));
        paramKeys[2] = Iparser.stringToBytes32("EP003");
        paramValues[2] = int256(uint256(data[4]));
        paramKeys[3] = Iparser.stringToBytes32("trans_time");
        paramValues[3] = int256(block.timestamp);
        paramKeys[4] = Iparser.stringToBytes32("EP005");
        paramValues[4] = int256(uint256(data[5]));


        transactionContract.addProcessedTransaction(data[0], data[1], recorder, paramKeys, paramValues);
    }
```

The above functions store data in arrays.

 ```python
 int256 A001 = int256(((EP001 + EP003) * latestSP002) / 10**18);
 report.addValue(reportName, "balanceSheet", "assets.details.cryptocurrency.totalAmountFairValue", A001);
 ```
The above report refers to the instantiation of the following contract, where we store the calculation results under the Reports smart contract.
 ```python
 contract Reports {
    mapping(string => mapping(string => mapping(string => int256))) public data;

    function addValue(string memory reportName, string memory reportType, string memory reportColumn, int256 value) external {
        data[reportName][reportType][reportColumn] += value;
    }

    function getValue(string memory reportName, string memory reportType, string memory reportColumn) external view returns (int256) {
        int256 result;
        result = data[reportName][reportType][reportColumn];
        return result;
    }

}
 ```

## Interfaces, Inheritance, Overriding, Abstraction

These concepts are often mentioned together and play a crucial role in Solidity large-scale project development. Let's summarize these concepts.

### Interfaces

Earlier, we mentioned this concept. Let's briefly review it.

An interface is a way to define the externally visible functions of a contract without providing their implementation. An interface is similar to a contract but cannot contain any state variables or function implementations. It ensures that a contract adheres to a specific API.

### Inheritance

Inheritance is a way to acquire attributes and behaviors from another contract. In Solidity, a contract can inherit methods and variables from another contract using the is keyword in the contract definition.

Inheritance allows for code reuse and polymorphism. The child contract inherits all non-private members from the parent contract.

Note that if contract A needs to reference interface A, it must override all the functions, events, error messages, etc., provided by interface A in order to instantiate the interface. Otherwise, if even one function is not implemented, the contract must be defined as abstract and cannot be deployed directly.

### Overriding

Overriding refers to changing the behavior of a function inherited from a parent contract in a child contract. In Solidity, to override a function from a parent contract, the function in the child contract must have the same name, return type, and parameters.

### Abstraction

An abstract contract is a contract that cannot be deployed directly because it contains at least one function that has not been implemented. In Solidity, abstract contracts are defined using the abstract keyword. Abstract contracts are typically used as a base for other contracts, which must implement all of the unimplemented functions before they can be deployed.

## router

code of this section：[router](https://github.com/CAFECA-IO/auditing_system/blob/develop/src/services/blockchain/contracts/router.sol)

In the design of isuncloud, users actually don't need to interact with many smart contracts. They only need to operate a single router to complete tasks such as registering contracts, writing data, setting exchange rates, defining time intervals, and viewing report fields. This is based on the design principle of **'abstraction'**.

### abstraction

Abstraction is a method of hiding complexity from the user's view, only presenting the most critical and relevant information. This principle allows users to interact with the system more easily without needing to understand the underlying complex implementation details. In the process of abstraction, the internal workings of the system are encapsulated, and users interact with the system through a simplified interface. This makes the software or system more user-friendly and reduces the difficulty of learning and using it.

Let's see how this is implemented:
```python
import "./transaction_contract.sol";
import "./get_transaction_time_span.sol";
import "./reports.sol";
import "../interfaces/i_transaction_handler.sol";

//Info:(20231115-Yang){This contract provides a clean interface for users to manipulate}
contract RouterContract {

    TransactionContract private transactionContract;
    GetTransactionTimeSpan private timeSpanReport;
    Reports private reports;

    constructor(address _transactionContract, address _timeSpanReport, address _reports) {
        transactionContract = TransactionContract(_transactionContract);
        timeSpanReport = GetTransactionTimeSpan(_timeSpanReport);
        reports = Reports(_reports);
    }
    //Info:(20231115-Yang){User should first input transaction type and handler addresses in order to register handlers}
    function registerHandler(bytes32 transactionType, address handlerAddress) external {
        ITransactionHandler handler = ITransactionHandler(handlerAddress);
        transactionContract.registerHanlder(transactionType, handler);
    }
    //Info:(20231115-Yang){After registering handlers, users can use this funtion to record event data}
    function addTransactionRecord(bytes32[] memory data) external {
        transactionContract.addRecord(data);
    }
    //Info:(20231115-Yang){If users never set rates, they should first set rates before providing time span}
    function setRate(bytes32 _SP002, bytes32 _SP003, bytes32 _SP004, bytes32 _reportName) external {
        timeSpanReport.setRate(_SP002, _SP003, _SP004, _reportName);
    }
    //Info:(20231115-Yang){Users can set a time span and reportName to get events within the time span}
    function generateReport(int256 startTime, int256 endTime, bytes32 reportName) external {
        timeSpanReport.filterTransactionsInRange(startTime, endTime, reportName);
    }
    //Info:(20231115-Yang){Users can read the latest transaction time}
    function getLatestTransactionTime() external view returns (int256) {
        return transactionContract.getLatestTransactionTime();
    }
    //Info:(20231201-Yang){User can read reports columns}
    function getValue(string memory reportName, string memory reportType, string memory reportColumn)external view returns(int256){
        return reports.getValue(reportName, reportType, reportColumn);
    }
}
```

By using constructors to instantiate interactive contracts, and then integrating the functionality of external contracts into the system, the implementation is complete!

## Interaction and Monitoring with Blockchain

Alright, now that we've wrapped up the smart contract portion, what methods can we use to interact with smart contracts more easily and even automate the above processes? This is where writing local scripts might come in handy. Node.js is a common choice for scripting interactions with Ethereum. We will use Node.js to implement the communication process with smart contracts and even extend functionality.

### test net

code of this section：[config](https://github.com/CAFECA-IO/auditing_system/blob/develop/hardhat.config.ts)

We need to understand that operations on Ethereum require spending Ether as gas fees. Therefore, deploying smart contracts on a testnet and using test Ether to verify if the smart contract functions as expected is an important step in smart contract development.

We can configure the testnet we want to use in the config file, such as Sepolia, Goerli, etc. In this system, we use the custom blockchain developed by Isuncloud, known as Isuncloud.

```typescript
const config: HardhatUserConfig = {
  defaultNetwork: 'iSunCoin',
  networks: {
    iSunCoin: {
      url: `https://isuncoin.baifa.io`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
}
```
To configure the blockchain you want to use, you can follow the example above, which includes:

```
1. url: 'https://isuncoin.baifa.io' specifies the node URL for the iSunCoin network. This is the entry point for connecting to a specific blockchain network. Typically, you can request a node URL from services like Infura. For example: http://infura/[Infura provides your node here].

2. accounts: [process.env.PRIVATE_KEY] specifies the account private key used for making transactions. You can use the private key provided by your EOA (Externally Owned Account, i.e., wallet) for this setting, so the blockchain knows which account is interacting with it. Be sure to keep your private key secure! You can store the private key in an .envfile, and if you plan to make your code public, remember to exclude your.env file from uploads.
```

### hardhat

Many IDEs available on the market, such as Remix, Truffle, and Ganache, provide packages for interacting with the blockchain. For example, Hardhat is a development environment and framework designed specifically for Ethereum developers, facilitating the development, deployment, testing, and debugging of smart contracts. It offers a range of tools and features that make interacting with the Ethereum blockchain more accessible.

Specific installation details and instructions can be found in the [System documentation](https://github.com/CAFECA-IO/auditing_system/blob/develop/README.md) or on the Hardhat official website."。

### ethers

Code of this section：[ethers](https://github.com/CAFECA-IO/auditing_system/blob/develop/src/services/blockchain/scripts/1.auto_deploy.js)

Ethers.js is a popular JavaScript library used to interact with the Ethereum blockchain. Developers can use Ethers.js to create and manage Ethereum wallets, send and receive Ether and tokens. Ethers.js supports various types of Ethereum node providers, including JSON-RPC, Infura, and Alchemy.

In iSunCloud, we use Ethers.js to handle tasks such as automated deployment, automatic data writing, rate setting, and other functionalities mentioned above.

We utilize Ethers.js to access the report fields in the reports.sol smart contract and verify the data to ensure that the calculation formulas meet expectations.
### ABI

Upon closely examining the code, you may come across the term 'ABI.' What is it?

ABI stands for Application Binary Interface. It is a data interface standard used for interaction between smart contracts and external callers, such as client applications or other contracts. Essentially, the ABI is a JSON format description of a contract's public functions, enabling external applications to know how to encode and decode interactions with the contract.

The ABI includes descriptions of all public functions in the contract, including their names, parameter types, return types, and more. Additionally, it specifies how to encode call parameters (inputs) into a format that the blockchain can understand and how to decode the outputs of transactions or function calls into a readable format.

In summary, when an external application (like ethers) needs to interact with a smart contract, the ABI is used to instruct the application on how to construct calls and interpret responses.

## Databse and API

code of this section：[prisma](https://github.com/CAFECA-IO/auditing_system/blob/develop/auditing_system_api/pages/api/v1/blockchain_to_prisma.js) and [api](https://github.com/CAFECA-IO/auditing_system/blob/develop/auditing_system_api/pages/api/v1/reports_api.js)

In the iSunCloud system, the process involves first retrieving data from the report.sol contract and storing it in local variables. This data is then written into a standardized report format (via an API), and the report is saved into a database. In the future, we can call the server to send the data from the database (schema model) to the front-end page.

In fact, it's also possible for the server to directly call the blockchain, but interactions with the blockchain typically take some time. Users don't have the patience to wait for these blockchain requests. Instead, we can preemptively execute blockchain requests during periods when the system is not in use. When users access the system, retrieving data directly from the database is clearly more efficient.

## Reports and Tokens

Remember when we mentioned NFT-based access control? That's right, the system actually distinguishes between the client side (frontend) and the developer side (backend). By leveraging NFT functionality, we create different access levels for each. We certainly can't allow our clients to see each other's reports, right?

### Link reports with NFTs

We treat the metadata of the report (such as reportName, startTime, endTime, etc.) as parameters for the NFT, and mint an NFT based on these parameters, each with a unique tokenID. Only by owning this NFT can one have the authority to request the server to provide the full report. We can use this tokenID as the client's report key.

For example, if Alice, Bob, and Cindy are involved, where Alice is a developer of the system, Bob is a customer using the system, and Cindy is another customer. Now, if Bob generates a report named 'X,' he holds the report token named 'X' with tokenID '1.' Bob has the right to request the server for the full report. Since all the data is stored in the database, Alice can also manage customer reports through the database and therefore can view them, but Cindy cannot.


### Creating a new Ethereum Token Standard

Code of this section:[report_nft](https://github.com/CAFECA-IO/auditing_system/blob/develop/src/services/blockchain/contracts/report_nft.sol)

iSunCloud is about to release a new Ethereum proposal based on ERC-721. The new feature primarily allows users to share reports without transferring their token permissions.

```python
function share(uint256 tokenId, address targetWallet) override external returns (uint256) {
        require(ownerOf(tokenId) == msg.sender, "Only the owner can share this report");
        require(targetWallet != address(0), "Target wallet cannot be zero");

        _tokenIdCounter += 1;
        uint256 newTokenId = _tokenIdCounter;

        Report memory originalReport = _reports[tokenId];
        _reports[newTokenId] = Report(originalReport.name, originalReport.startTime, originalReport.endTime);

        _mint(targetWallet, newTokenId);

        emit ReportNFTShared(msg.sender, targetWallet, newTokenId);

        return newTokenId;
    }
```

If Bob shares the report 'X' with Cindy, Cindy will receive a new token with the name 'X' and tokenId = 2. This way, Cindy will be able to view the complete report for 'X'.

## Conclusion, References, and Source Code

*It's not about the destination, it's all about the journey*

Thank you for your hard work! Congratulations on completing the reading. We have delved into dynamic transaction processing contracts and experienced the powerful impact of blockchain technology in today's digital age. From a preliminary understanding of Solidity's basic syntax to exploring how smart contracts shape our transactions and data interactions, this journey has been both challenging and enlightening.

In this article, we not only explored technical details such as optimizing smart contracts and building robust system architectures but also gained insights into how the iSunCloud accounting system is implemented and how to efficiently communicate and interact with the blockchain backend. Transforming objects into digital assets is not only a technological breakthrough but also a revolution in how we perceive the world.

In the future, blockchain technology will continue to mature and thrive, benefiting areas such as voting mechanisms, finance, big data, and more. I hope readers, after finishing this article, can develop a certain understanding of implementing blockchain technology and advance step by step through ideas, planning, implementation, and debugging towards greatness.

### Reference
1. [alincode的2019 iT 邦幫忙鐵人賽](https://ithelp.ithome.com.tw/articles/10204079)

2. [資料密集型系統設計](https://github.com/Vonng/ddia/blob/master/zh-tw/README.md)

### Source code

1. [Isuncloud auditing system](https://github.com/CAFECA-IO/auditing_system/tree/feature/auto_test)
