## Smart Contract Attack Methods and Defense Strategies

This article explores common errors and oversights in the smart contract development process, as well as various malicious attack methods and defense strategies in blockchain technology. It aims to help developers avoid repeating past mistakes and prevent the heavy losses suffered by previous developers. The article also emphasizes the importance of security and stability for developers when creating smart contracts.

***

### Attack Types


A. Malicious actions

Malicious behavior may include actions such as spreading malware to deceive users. This type of exploitation primarily occurs through the internet, aiming to compromise user identities or commit fraud using malicious software or viruses. Such malicious activities can severely impact the financial status of the victims. Malicious attacks can take many forms, such as emails from wallets requesting users to synchronize their accounts with a network that has just undergone a hard fork. Exploiting users' wallets through malicious attacks could allow attackers to drain all funds. Malicious techniques include attacks on cryptocurrency mining operations, Slack channels, and forums that trick miners into logging in through compromised links. Glupteba is another form of malware that uses the Bitcoin blockchain to receive updates, ensuring it remains active even if the server connection is terminated by antivirus software. This malware spreads through scripts to steal confidential information like user IDs, passwords, browsing history, saved cookies, and more.

***

B. Weak protocols

Blockchain technology includes a consensus protocol to ensure the smooth operation of the network. Different blockchain platforms adopt various protocols, with Proof of Stake (PoS) increasingly favored for its energy efficiency and security. Although the PoS protocol is more efficient and environmentally friendly in some aspects compared to Proof of Work (PoW), it also presents its own security challenges. For instance, the "Nothing at Stake" problem may encourage nodes to validate multiple blockchain branches since doing so incurs almost no cost. Additionally, PoS systems may face risks such as "long-range attacks" and "stake centralization," the latter occurring when a small number of participants control the majority of the staked tokens.

In PoS, attackers would need to control a significant amount of staked coins to carry out a 51% attack, making the cost of such an attack high. However, if an attacker succeeds, they could rewrite transaction history or double-spend. Besides these, other attack methods, such as the centralization of staking pools, could threaten the network's decentralized nature.

***

C. Fraud

This method exploits merchants by taking advantage of the instability of digital transactions to gain profit. Fraud can occur when merchants release goods before a transaction is fully confirmed. Under normal circumstances, a Bitcoin transaction is confirmed after six confirmations. However, a consumer might persuade a merchant to release goods before waiting for the six confirmations, enabling them to initiate techniques like a one-confirmation or n-confirmation attack to perform double-spending.

Similarly, with the growing acceptance of cryptocurrency payments by many retailers, allowing consumers to receive their products immediately—such as purchasing coffee in a café—there's a risk. Consider a scenario where an adversary manages to spend the same cryptocurrency within a short time frame, triggering a race between the two transactions. If the second transaction is adopted by the mining pool for processing, the first transaction will be discarded, potentially leading to the merchant not receiving payment for the goods provided.

***

D. Application vulnerabilities.

When there are errors in the smart contract code, application vulnerabilities arise. This type of exploitation primarily occurs within smart contracts. It happens when developers fail to identify code errors in decentralized applications. Attackers can exploit simple coding errors to drain all the funds from a contract's wallet. Smart contract applications are akin to web applications running on the blockchain. Like web application vulnerabilities, they also contain bugs, but these vulnerabilities can lead to severe challenges. For example, the DAO was able to raise $150 million, but due to a code vulnerability, attackers were able to steal around $60 million. Rubixi and GovernMental are some examples of smart contract applications that were flawed due to code vulnerabilities. Application vulnerabilities not only allow attackers to steal funds but can also disrupt the various operations of the application.

### Attack Techniques


#### Re-entry

Reentrancy is considered one of the most catastrophic attack techniques in smart contracts. This attack method can completely destroy a contract or steal valuable information. A reentrancy attack can occur when a function calls another contract through an external call. The following code snippet in List 1 demonstrates a piece of code that could be exploited to perform a reentrancy attack. This exploitation allows an attacker to recursively call the main function, creating an unintended loop that repeats multiple times. For example, when a vulnerable contract contains a withdrawal function, the contract could be illegally called multiple times, draining any available balance it holds. Single-function reentrancy attacks and cross-function reentrancy attacks are two different types that can be exploited by attackers. This exploitation allows an attacker to use external calls to perform the desired tasks.

Let’s take an example of a vulnerable contract that can be used as a vault, allowing users to withdraw 1 Ether per week.

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
            //The following line has a vulnerability; try to think about what might be unreasonable.
            require(now >= lastWithdrawTime[msg.sender] + 1 weeks);
            balances[msg.sender] -= _weiToWithdraw;
            lastWithdrawTime[msg.sender] = now;
        }
    
    }
```
If an attacker creates a malicious contract as follows:
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
    
            //game start
            etherStore.withdrawFunds(1 ether);
        
        }
    
        function collectEther() public{
            msg.sender.transfer(this.balance);
        }
    
        //fallback function - where the magic begins
        function() payable{
            if(etherStore.balance > 1 ether){
                etherStore.withdrawFunds(1 ether);
            }
        
        }
    
    }
```

Let's break it down:

1. The attacker first deploys the EtherStore contract. Then, the attacker deploys the Attack contract and specifies the EtherStore contract's address in the constructor. This allows the Attack contract to interact with the EtherStore contract.


2. The attacker initiates the attack by calling the attackEtherStore() function of the Attack contract. This function first requires the attacker to send at least 1 Ether to the Attack contract. The attackEtherStore() function then calls the depositFunds() method of the EtherStore contract, depositing 1 Ether into the EtherStore contract. Immediately after, the attackEtherStore() function calls the withdrawFunds() method of the EtherStore contract, attempting to withdraw 1 Ether from the EtherStore contract.


3. When the EtherStore contract processes the withdrawal request, it sends 1 Ether back to the Attack contract. Since this is an Ether transfer, it automatically triggers the Attack contract’s callback function (fallback function).


4. Reentrancy Attack in the Callback Function: In the callback function of the Attack contract, if it detects that the balance of the EtherStore contract is still greater than 1 Ether, it will again call the withdrawFunds() method of the EtherStore contract. The key point is that the Ether is sent before the EtherStore contract updates the user's balance and last withdrawal time. This means that the Attack contract can withdraw funds multiple times in the same transaction.


5. Each time the callback function of the Attack contract is triggered, it checks the balance of the EtherStore contract and attempts to withdraw again. This loop continues until the balance of the EtherStore contract drops below the amount needed for further withdrawals.


6. Once the balance of the EtherStore contract is insufficient for further withdrawals, the callback function of the Attack contract stops executing. The attacker can then call the collectEther() function of the Attack contract to transfer all the funds withdrawn from the EtherStore contract to their own account.

***

**To defend against this attack, there are three primary methods:**

1. Use the built-in transfer function to send Ether to an external contract because the transfer function attaches an additional 2300 gas to the external call, which is insufficient to support the target contract in making further calls to other contracts.

2. Use the **"Checks-Effects-Interactions"** pattern to ensure that all state modifications are executed before sending Ether to other contracts.

3.  Introduce a mutex by adding a state variable to lock the contract during code execution, preventing reentrant calls.

```python
        contract EtherStore {
    
        //initialize the mutex
        bool reEntrancyMutex = false;
        uint256 public withdrawalLimit = 1 ether;
        mapping(address=>uint256) public lastWithdrawTime;
        mapping(address=>uint256) public balances;
    
        function depositFunds() public payable{
            balances[msg.sender] + = msg.value;
        }
    
        function withdrawFunds(uint256 _weiToWithdraw) public{
            require(!reEntrancyMutex);
            require(balances[msg.sender] >= _weiToWithdraw);
            //limit the withdrawal
            require(_weiToWithdraw <= withdrawalLimit);
            //limit the time allowed to withdraw
            require(now>=lastWithdrawTime[msg.sender]+1weeks);
            balances[msg.sender] - = _weiToWithdraw;
            lastWithdrawTime[msg.sender] = now;
            // set the reEntrancy mutex before the external call
            reEntrancyMutex = true;
            msg.sender.transfer(_weiToWithdraw);
            //release the mutex after the external call
            reEntrancyutex = false;
        }
    
        }

```
***


#### Overflow

This type of vulnerability is relatively easy to trigger and occurs in transactions that accept unauthorized input data or values. Smart contract overflow primarily happens when the provided value exceeds the maximum limit. These contracts are mainly written in Solidity, which can handle numbers up to 256 bits. Therefore, incrementing by 1 can lead to an overflow. Traditional testing methods are insufficient to identify overflow vulnerabilities in smart contracts.

For example, consider the following vulnerable smart contract code:

```python
    function batchTransfer(address[] _acceptors, uint256 _value) public whenNotPaused returns (bool) {
        uint cnt = _acceptors.length;
        uint256 total = uint256(cnt) * _value;
        require(cnt > 0 && cnt <= 20);
        require(_value > 0 && balances[msg.sender] >= total);
        balances[msg.sender] = balances[msg.sender].sub(total);
        for (uint i = 0; i < cnt; i++) {
            balances[_acceptors[i]] = balances[_acceptors[i]].add(_value);
            Transfer(msg.sender, _acceptors[i], _value);
        }
        return true;
    }
```

​​,An attacker can exploit this vulnerability by invoking the function with specific parameters. For example, in the following code, total = value * _2 = 0, the check balances[msg.sender] >= total would be bypassed. The attacker can input two addresses in the recipient function to trick the token smart contract into transferring Ether to both addresses.

Underflow in smart contracts occurs in the opposite scenario to overflow. However, underflow attacks are easier to execute because it is usually challenging for attackers to acquire the amount of tokens necessary to cause an overflow.

***

#### Short Address Attack

This vulnerability occurs due to weaknesses in the Ethereum Virtual Machine (EVM). The EVM allows for imprecise parameter padding, enabling an adversary to send specially crafted addresses that lead to exploitation. A short address attack follows a strategy similar to SQL injection vulnerabilities. When underflow is detected, the EVM adds a zero at the end of the address to ensure it contains a 256-bit data type. However, the adversary can exploit this vulnerability by omitting the last zero of the Ethereum address to carry out the attack. This vulnerability is an input validation flaw, primarily occurring on the sender's side due to weak transaction generation code.

***

#### DELEGATECALL

Smart contract developers use the CALL and DELEGATECALL instructions to write modular code. The DELEGATE opcode functions similarly to a message CALL; however, unlike a standard call, the msg.sender and msg.value remain unchanged when executing the called contract's code. This feature allows developers to create reusable code, but it also increases the risk of unexpected code execution when using DELEGATECALL. The use of DELEGATECALL suggests that vulnerabilities might be introduced when constructing custom libraries, potentially leading to new security issues. DELEGATECALL vulnerabilities can be avoided by carefully auditing the interactions between library contracts and calling contracts, and by developing stateless libraries whenever possible.

***

#### Default visibility

Visibility specifiers in Solidity functions control how functions can be called. These specifiers also play a role in controlling access when users are allowed to call external functions through derived contracts. Improper implementation of visibility specifiers can have serious consequences for smart contracts. By default, a function's visibility is set to public, allowing external contracts to call the function if its visibility is not explicitly specified. This vulnerability occurs when developers forget to set the visibility specifier to private, thereby unintentionally exposing the function to external access.

```python
        contract GuessAddress {
            function gainEther() {
              // Winner while the last 8 hex
              // characters of the address are 0.
              require(uint32(msg.sender) == 0);
              _sendEther();
            }
          
            function _sendEther() {
              msg.sender.transfer(this.balance);
            }
      }

```

The above example showcases a smart contract based on an address guessing game. Participants can win a reward by generating an Ethereum address where the last 8 hexadecimal characters must include zeros. Once this requirement is met, the gainEther() function can be executed to receive the reward. However, because the vulnerable code does not specify visibility and the _sendEther() function is set to public, an attacker could potentially steal the reward.

To prevent this, ensure that function visibility is always explicitly set, or use a newer compiler that can warn you when visibility is not specified.


***

#### Transaction Ordering Dependence

Transaction Ordering Dependence (TOD) is a vulnerability in smart contracts that occurs when the contract's behavior depends on the order in which transactions are executed within a block. Since the order of transactions within a block is determined by miners, an attacker can exploit this by reordering transactions to gain unfair economic advantages.

1. Importance of Transaction Ordering: In a blockchain, the order of transactions can affect the final state of a smart contract. For example, when multiple users compete to perform a contract operation (such as purchasing, bidding, or withdrawing), the order of transactions determines who succeeds first.

2. Attack Method: An attacker can monitor pending transactions on the blockchain and insert their own transaction within the same block, or adjust the gas price to prioritize their transaction, thereby interfering with the expected behavior of the contract.

***

#### Timestamp Dependence

Timestamp dependence is another vulnerability that can be exploited by malicious miners. To gain an advantage, miners can adjust the timestamp by a few seconds. The timestamp dependence vulnerability arises from a misunderstanding of time recording. It disconnects the Ethereum network from a synchronized global clock. For example, a smart contract might use the current timestamp to generate a random number to determine lottery results. Since smart contracts allow miners to submit a timestamp within 30 seconds after block validation, this gives miners more opportunities to exploit the system. As a result, the outcome of the random number generator can be manipulated for profit.

***

### Real case


#### 2016，The DAO

2The 2016 Ethereum DAO attack is a significant and controversial event in blockchain history. This attack had profound implications for the Ethereum network, ultimately leading to a "hard fork" of the Ethereum network.

The DAO (Decentralized Autonomous Organization) was a smart contract system built on the Ethereum blockchain, designed to create a decentralized investment fund. It raised a substantial amount of Ether (ETH) through a public crowdsale.

Unfortunately, there was a vulnerability in the DAO smart contract. In June 2016, an unknown attacker exploited this vulnerability, extracting about 3.6 million Ether, worth approximately $50 million at the time.

The vulnerability was due to a bug in the code where the developers had not accounted for the possibility of recursive calls. As a result, the attacker was able to steal millions of dollars' worth of Ether within the first few hours. The DAO attack scenario demonstrated just how destructive a simple smart contract vulnerability can be.

This attack sparked widespread attention and debate within the Ethereum community. On one side, some argued for adhering to the principle of "code is law," meaning that the loss should be accepted even if it resulted from a flaw in the code. On the other side, some advocated for reversing the transactions to restore the funds to the original holders.

After intense discussions and voting, the Ethereum community decided to implement a hard fork to reverse the transactions in the DAO contract and return the funds to the original investors. This hard fork created a new branch on the blockchain, restoring the stolen funds.

The hard fork resulted in the creation of two separate blockchains and two independent currencies: Ethereum (ETH) and Ethereum Classic (ETC). Ethereum (ETH) is the new chain created after the hard fork, while Ethereum Classic (ETC) continues to operate on the original blockchain.
***

#### 2018，PoWHC

This project originated from 4chan's /biz/ board and emerged in a unique way: as a publicly announced Ponzi scheme. This might sound unbelievable, but its value skyrocketed to over a million dollars in a very short time, involving more than a thousand Ether.

Interestingly, the project's code was actually based on Jochen Hoenicke's original Ponzi token concept and barely conformed to Ethereum's ERC-20 token standard. The issue here is that while it met the basic specifications, there were some significant vulnerabilities in the code.

The most notable vulnerability appeared in the implementation of the ERC-20 standard, specifically in the part that allowed users to authorize others to transfer tokens on their behalf. This might seem harmless, but in reality, this vulnerability allowed malicious users to exploit a second account to sell tokens from the first account. Ultimately, this led to the second account acquiring an enormous number of PoWH tokens due to an integer underflow.

So, how was this vulnerability exploited? When the second account attempted to transfer one PoWH token, due to a coding error, its balance underflowed to a very large value, nearly equal to 2^256 minus 1. As a result, this account could easily convert these fraudulent PoWH tokens into real Ether.

***

#### 2017，Parity the Parity multi-signature wallet(2nd attack)

The second attack on the Parity multi-signature wallet occurred in 2017 and resulted in approximately $300 million worth of Ether being frozen.

The Parity multi-signature wallet is an Ethereum-based wallet built on smart contracts, allowing multiple users to jointly control and manage funds. The multi-signature mechanism means that any significant transfer of funds requires multiple signatures, intended to enhance security.

In July 2017, Parity experienced its first security breach, leading to the theft of $30 million worth of Ether. Following this, Parity attempted to fix the vulnerability, but unfortunately, the new code introduced another flaw.

During the process of fixing the first vulnerability, Parity inadvertently made its wallet library contract an ownerless contract. Due to this mistake, anyone could become the owner of the contract and had the authority to execute any operation, including destroying the contract.

In November 2017, an unknown attacker discovered this vulnerability and, either mistakenly or maliciously, triggered the contract's self-destruct function. This action caused all wallets relying on the library contract to be frozen. This meant that wallets containing a large amount of Ether became inaccessible, with estimated losses of around $300 million.

This incident was a significant blow to both Parity and the broader Ethereum community. It raised widespread concerns about the security of smart contracts and the reliability of the Ethereum platform. Additionally, it sparked debates about whether a hard fork should be implemented to unfreeze the funds, though this approach was also controversial.

***

#### The first attack on the Parity multi-signature wallet (1st attack) in July 2017 was primarily due to an issue with default visibility in Solidity.

PThe first major security vulnerability in the Parity multi-signature wallet occurred in July 2017, resulting in the theft of approximately $30 million worth of Ether.

In July 2017, hackers discovered a vulnerability in the Parity multi-signature wallet contract. This vulnerability was located in a specific function of the contract, which allowed an unauthorized user to become the owner of the contract.

The attacker first exploited this vulnerability to gain control of the contract, and then transferred a large amount of Ether from several wallets controlled by the contract. This attack resulted in the theft of about $30 million worth of Ether.

***

#### GovernMental

The issue with using timestamps in smart contracts is that they may not be entirely reliable. On the Ethereum blockchain, timestamps are set by miners, which means they have the potential to be manipulated. In some cases, miners might slightly adjust the timestamp for their own benefit, which could impact smart contracts that rely on precise timestamps.

For games like "GovernMental," where the outcome heavily depends on the exact timing of transactions, this potential unreliability of timestamps becomes a problem. It could lead to unfair game results or the possibility of manipulation, causing dissatisfaction and disputes among participants.
***

### references

1. [Smart Contract: Attacks and Protections](https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=8976179) by SARWAR SAYEED , HECTOR MARCO-GISBERT , (Senior Member, IEEE), AND TOM CAIRA
2. [Master in Ethereum](https://github.com/ethereumbook/ethereumbook) by Gavin Wood, Antonopoulos Andreas
3. [How $800k Evaporated from the PoWH Coin Ponzi Scheme Overnight](https://medium.com/@ebanisadr/how-800k-evaporated-from-the-powh-coin-ponzi-scheme-overnight-1b025c33b530)






