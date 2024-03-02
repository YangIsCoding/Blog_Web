# EIP-1559

## What is Ethereum Improvement proposal - 1559

>*Vitalik Buterin: A transaction pricing mechanism that includes fixed-per-block network fee that is burned and dynamically expands/contracts block sizes to deal with transient congestion.*

Before the emergence of EIP-1559 on August 5, 2021, gas fees were determined by **auction** in the market. Each transaction could set a gas fee that the user was willing to pay, and when the network became congested, meaning there were many transactions to process, miners (nodes responsible for processing transactions) would prioritize transactions that paid a higher gas price. However, this auction system led to unstable gas prices because users had to **guess** how much gas fee to pay each time, depending on other users' bids.

The purpose of EIP-1559 (one of the five London network upgrade proposals) is to change the existing gas fee calculation model to enable **efficient scheduling of transaction volumes** and replace the auction model. Under EIP-1559, gas fees will consist of two components - the **Base Fee** and **Tips**.

The Base Fee will be a standard fee that all users must pay, calculated by the network based on network traffic (but this calculation is predictable). Tips will be optional additional fees that users can pay to expedite their transaction speed.

    If the previous block is exactly 50% full, the base fee will remain unchanged.
    If the previous block is 100% full, the base fee will increase by up to 12.5% in the next block.
    If the previous block is over 50% but not fully full, the base fee will increase by less than 12.5%.
    If the previous block is 0% full - i.e., empty - the base fee will decrease by up to 12.5% in the next block.
    If the previous block is over 0% but less than 50% full, the base fee will decrease by less than 12.5%.

EIP-1559 also requires the network to **burn** Ether tokens used to pay for base fees (Ether Burning). This process will decrease the total supply of Ether tokens, making Ether more scarce, and thus more valuable. It can also be used as a means to control inflation of Ether. Furthermore, prior to EIP-1559, miners could reorder transactions from highest to lowest bid before including them in a block. They could replace some of the lowest bidding transactions with intentionally high fee transactions since ultimately the fees would return to the miners, and by increasing the minimum fee, transactions at the front would also have to pay more to the miners.

So once Ethereum implements EIP-1559, users who want regular transaction processing speeds can pay the base fee (which gets burned), while those who want faster transaction processing speeds can add a tip (miner fee), eliminating the need for users to guess the required gas fees.

## transaction format
EIP-1559 utilizes a new transaction format called EIP-2718, where these parameters are serialized using the Recursive Length Prefix (RLP) format. The format is as follows:

	0x02 || rlp([chain_id, nonce, max_priority_fee_per_gas, max_fee_per_gas, gas_limit, destination, amount, data, access_list, signature_y_parity, signature_r, signature_s])
 
- Gas prices have been replaced with **maximum priority fee per gas** and **maximum fee per gas**for each type of gas.
- **The chain ID is encoded separately** rather than being included in the signature v value. This essentially replaces the EIP-155 implementation (v = recid + chainID * 2 + 35) with a simpler approach.
- The signature v value now is a simple parity bit (**signature Y parity**), which is either 0 or 1, depending on which point on the elliptic curve should be used.

The base fee per unit of gas, which can be adjusted up or down for each block according to a formula, is a function of the gas used in the parent block and the gas target of the parent block (the gas limit multiplied by an elastic multiplier).

The algorithm results in increasing the base fee per unit of gas when the block exceeds the gas target, and decreasing it when the block falls below the gas target. The base fee per unit of gas is burned. Transactions specify the maximum fee per unit of gas they are willing to pay to miners to encourage them to include their transactions (i.e., the priority fee). Transactions also specify the maximum total fee per unit of gas they are willing to pay, which includes the priority fee and the base fee per unit of gas for the block (i.e., the base fee). The transaction will always pay the base fee per unit of gas included in its block, and as long as the total of the two fees does not exceed the maximum fee per unit of gas set in the transaction, they will pay the priority fee per unit of gas set in the transaction. If the total fee of the transaction exceeds the maximum fee per unit of gas, the transaction will not be accepted and processed by the blockchain network.
![](https://blog.bitmex.com/wp-content/uploads/2021/05/Screenshot-2021-05-11-at-13.21.34-1024x512.png)


## Specification

1.As of FORK_BLOCK_NUMBER, a new EIP-2718 transaction is introduced with TransactionType 2.

2.The inherent cost of new transactions is inherited from EIP-2930:

	21000 + 16 * non-zero calldata bytes + 4 * zero calldata bytes + 1900 * access list storage key count + 2400 * access list address count

3.This transaction's EIP-2718 TransactionPayload will be:

	rlp([chain_id, nonce, max_priority_fee_per_gas, max_fee_per_gas, gas_limit, destination, amount, data, access_list, signature_y_parity, signature_r, signature_s])

4.This transaction's signature_y_parity、signature_r and signature_s elements means the signature for the following:

	keccak256(0x02 || rlp([chain_id, nonce, max_priority_fee_per_gas, max_fee_per_gas, gas_limit, destination, amount, data, access_list])) 

5.Transaction's EIP-2718 ReceiptPayload include the follwoing params：

	rlp([status, cumulative_transaction_gas_used, logs_bloom, logs])

## Backward compatibility

Traditional Ethereum transactions can still operate normally and be included in blocks. However, they will not directly benefit from the new pricing system. This is because upgrading from traditional transactions to new transactions will result in the gas_price of traditional transactions being completely consumed by base_fee_per_gas and priority_fee_per_gas.

- Block Hash Changing
  
Since the block hash is changing, all applications that verify blocks or use block hash to verify block content will need to adapt to the new data structure (which has an additional item). If only the block header bytes are taken and hashed, the hash value can still be obtained correctly. However, if constructing the block header from its constituent elements, the new item needs to be added at the end.

- Gas Price
  
Before this change, GASPRICE represented both the amount of ether the signer paid per gas unit and the amount of ether the miner received per gas unit. Starting from this change, GASPRICE now only represents the amount of ether the signer pays per gas unit. The transaction fee earned by the miner can no longer be directly accessed in the EVM. This makes the cost clearer for users as it separates what users need to pay.

## Security Considerations
### Increase maximum block size/complexity
EIP-1559 will increase the maximum block size, which may pose issues if miners are unable to process a block quickly, leading them to mine an empty block. Over time, the average block size should remain similar to what it would be without this proposal, so this is primarily a short-term issue of block size spikes. There's a possibility that one or more clients may not handle these short-term spikes well, leading to errors such as out-of-memory or similar issues. Client implementations should ensure that their clients can appropriately handle individual blocks until the maximum size is reached.

### Transaction Sorting
Due to most participants no longer competing based on priority fees, but rather using base fees to ensure inclusion, the sorting of transactions now depends on the internal implementation details of individual clients, such as how they store transactions in memory. It is suggested that transactions with the same priority fee be sorted based on the time they are received to protect the network from spam attacks, where attackers flood the mempool with a large number of transactions to ensure at least one transaction is in a favorable position. Miners should still prioritize transactions with higher priority fees from a selfish mining perspective rather than lower priority fee transactions.

### Miners Mining Empty Blocks

It is possible for miners to mine empty blocks until the base fee becomes very low, and then begin mining partially filled blocks, reordering transactions based on priority fees. Although this attack is possible, it is not a particularly stable equilibrium as long as mining is decentralized. Any miner defecting from this strategy would be more profitable than the miners participating in the attack, even after the base fee reaches zero. Since any miner can defect anonymously, and specific defections cannot be proven, the only feasible way to execute this attack is by controlling 50% or more of the hashrate. If the attacker has exactly 50% of the hashrate, they would not gain any ether from priority fees, while defectors would gain twice the ether from priority fees. For the attacker to profit from the attack, they would need more than 50% of the hashrate, which means they could execute double spend attacks or simply ignore any other miners, which would be a more profitable strategy.

### Burning ETH will exclude fixed supply
By burning the base fee, we can no longer guarantee the fixed supply of Ether. This could lead to economic instability because the long-term supply of Ether will no longer remain constant. While this is a valid concern, it's challenging to quantify its impact. If the base fees burned exceed the mining rewards generated, then Ether will be deflationary; if mining rewards exceed the burned fees, then Ether will be inflationary. Since we cannot control users' demand for block space, we cannot assert whether Ether will ultimately be inflationary or deflationary. Therefore, this change diminishes some control that core developers have over the long-term supply of Ether.

### Potential Centralization
Sergio Demian Lerner raised concerns that EIP-1559 could lead to dominant mining pools in the network, resulting in centralization. With the reduction of miner income under the proposed model, smaller miners may struggle to compete, further exacerbating centralization and potentially threatening the decentralized nature of the network.

## News about EIP-1559
1. According to data from the cryptocurrency tracker Ultrasound Money, as of the publication of this article, approximately 386,466 ETH (around $1.1 billion) have been burned. Since the implementation of EIP-1559 on August 5th, over $1 billion worth of Ether has been burned, marking another milestone in the world of cryptocurrencies. Ethereum is currently experiencing a slight deflationary period, but once the Ethereum blockchain transitions to a proof-of-stake system in 2022 as part of Ethereum 2.0, it is expected to face larger deflationary periods more frequently.
2. As of the implementation of EIP-1559 365 days ago, according to ultrasound.money, approximately 2.6 million Ether has been burned, while 5.5 million Ether has been issued based on the proof-of-work (PoW) consensus. Overall, this represents a 2.4% annual increase in the total circulation of Ether. Over the past 365 days, approximately 4.89 Ether has been burned per minute, offsetting issuance by a factor of 0.47x. Among different types of transactions, the amount of Ether burned in NFT activities has surpassed that in DeFi activities, highlighting the rise of NFTs and the cooling down of DeFi over the past year. Following NFT activities are arbitrage activities involving Miner Extractable Value (MEV) and other activities.

## EIP-1559 raw transaction sample and algorithm
   ### RLP(recurrsivep-length prefix):
RLP standardizes the transmission of data between nodes in a way that saves space. The purpose of RLP is to encode arbitrarily nested binary data arrays. RLP encodes positive integers in big-endian binary form without leading zeros (thus making zero equal to an empty byte array), and deserialization of integers with leading zeros is considered invalid.
#### Definition
- The RLP function takes an item, where an item is defined as follows: a string is an item, and a list is an item.
- In Ethereum, RLP (Recursive Length Prefix) is the primary method for data serialization and deserialization. Data structures such as blocks, transactions, etc., are RLP encoded before being stored in the database for persistence.
#### To encode a dictionary using RLP, there are two common specifications:
1. Using the format [[k1,v1],[k2,v2],...], where keys are sorted in lexicographical order.
2. Using the advanced Patricia tree encoding method adopted by Ethereum.
#### RLP encoding defination
1. For a single byte whose value is in the range [0x00, 0x7f] (decimal [0, 127]), the byte itself is its RLP encoding.
2. Otherwise, if the length of a string is from 0 to 55 bytes, the RLP encoding consists of a single byte with the value of 0x80 (decimal 128) plus the length of the string, followed by the string itself. Thus, the range of the first byte is [0x80, 0xb7] (decimal [128, 183]).
3. If the length of a string exceeds 55 bytes, the RLP encoding consists of the following parts: the value of the first byte is 0xb7 (decimal 183) plus the number of bytes required to represent the length of the string. Next is the length of the string, followed by the string itself.
4. If the total payload length of a list (i.e., the combined length of all its items after RLP encoding) is between 0 and 55 bytes, the RLP encoding consists of the following parts: the value of the first byte is 0xc0 plus the length of the list. Next is the concatenation of the RLP encoding of all items. In this case, the range of the first byte is [0xc0, 0xf7] (decimal [192, 247]).
5. If the total payload length of a list exceeds 55 bytes, the RLP encoding consists of the following parts: the value of the first byte is 0xf7 plus the number of bytes required to represent the length of the payload. Next is the length of the payload, followed by the concatenation of the RLP encoding of all items. In this case, the range of the first byte is [0xf8, 0xff] (decimal [248, 255]).

		def rlp_encode(input):
		    if isinstance(input,str):
		        if len(input) == 1 and ord(input) < 0x80:
		            return input
		        return encode_length(len(input), 0x80) + input
		    elif isinstance(input, list):
		        output = ''
		        for item in input:
		            output += rlp_encode(item)
		        return encode_length(len(output), 0xc0) + output
		
		def encode_length(L, offset):
		    if L < 56:
		         return chr(L + offset)
		    elif L < 256**8:
		         BL = to_binary(L)
		         return chr(len(BL) + offset + 55) + BL
		     raise Exception("input too long")
		
		def to_binary(x):
		    if x == 0:
		        return ''
		    return to_binary(int(x / 256)) + chr(x % 256)
#### RLP decoding definition
1. If the prefix falls within the range [0x00, 0x7f], then the data is considered a string, and the string is just the first byte itself.
2. If the range of the first byte is within [0x80, 0xb7], then the data is considered a string, and the length of the string is equal to the first byte minus 0x80, followed by the content after the first byte.
3. If the range of the first byte is within [0xb8, 0xbf], then the data is considered a string, and the length of the string (in bytes) is equal to the first byte minus 0xb7, followed by the content after the first byte.
4. If the range of the first byte is within [0xc0, 0xf7], then the data is considered a list, where the total payload of all items is equal to the first byte minus 0xc0, followed by the concatenation of the RLP encoding of all items in the list.
5. If the range of the first byte is within [0xf8, 0xff], then the data is considered a list, where the length of the list is equal to the first byte minus 0xf7, followed by the payload of the list, and finally followed by the concatenation of the RLP encoding of all items in the list.

		def rlp_decode(input):
		    if len(input) == 0:
		        return
		    output = ''
		    (offset, dataLen, type) = decode_length(input)
		    if type is str:
		        output = instantiate_str(substr(input, offset, dataLen))
		    elif type is list:
		        output = instantiate_list(substr(input, offset, dataLen))
		    output += rlp_decode(substr(input, offset + dataLen))
		    return output
		
		def decode_length(input):
		    length = len(input)
		    if length == 0:
		        raise Exception("input is null")
		    prefix = ord(input[0])
		    if prefix <= 0x7f:
		        return (0, 1, str)
		    elif prefix <= 0xb7 and length > prefix - 0x80:
		        strLen = prefix - 0x80
		        return (1, strLen, str)
		    elif prefix <= 0xbf and length > prefix - 0xb7 and length > prefix - 0xb7 + to_integer(substr(input, 1, prefix - 0xb7)):
		        lenOfStrLen = prefix - 0xb7
		        strLen = to_integer(substr(input, 1, lenOfStrLen))
		        return (1 + lenOfStrLen, strLen, str)
		    elif prefix <= 0xf7 and length > prefix - 0xc0:
		        listLen = prefix - 0xc0;
		        return (1, listLen, list)
		    elif prefix <= 0xff and length > prefix - 0xf7 and length > prefix - 0xf7 + to_integer(substr(input, 1, prefix - 0xf7)):
		        lenOfListLen = prefix - 0xf7
		        listLen = to_integer(substr(input, 1, lenOfListLen))
		        return (1 + lenOfListLen, listLen, list)
		    raise Exception("input does not conform to RLP encoding form")
		
		def to_integer(b):
		    length = len(b)
		    if length == 0:
		        raise Exception("input is null")
		    elif length == 1:
		        return ord(b[0])
		    return ord(substr(b, -1)) + to_integer(substr(b, 0, -1)) * 256


   ### private key production：
   The first and most crucial step in generating a key is finding a secure source of entropy or randomness. To generate an Ethereum private key, you need to choose a number between 1 and 2^256. Ethereum software typically utilizes the operating system's random number generator to generate 256 random bits.
   ### public key production：
   The public key is a set of x and y coordinates that satisfy the elliptic curve equation. It is derived from the private key through elliptic curve multiplication. This process is irreversible, meaning the private key cannot be derived from the public key.
   
	  	K = k * G
   
   K is the public key, k is the private key, and G is a constant point known as the generator point or base point.
   
   ![](https://miro.medium.com/v2/resize:fit:1200/format:webp/0*n5t8Gfv2NejIvwAq.png)
   
   Ethereum uses secp256k1 to puduce elliptic curve，definition as follow：
   
		y ² = ( x ³ + 7 ) when over ( 𝔽 p )
		or：
		y ² |p| = ( x3 + 7 ) |p|

   This curve is defined over a prime field of prime order, where p = 2^256 - 2^32 - 2^9 - 2^8 - 2^7 - 2^6 - 2^4 - 1. This is an extremely large prime number, which makes this curve highly reliable.
   
   **we can use helpeth to puduce private and public keys**
   
   ![image](https://github.com/CAFECA-IO/KnowledgeManagement/assets/59311328/fd4b21cc-a119-4877-a2b3-1af502fdf6b0)

   - (P.S.)(ICAP) is a client address protocol compatible with the International Bank Account Number (IBAN) system. It aims to reference and process customer accounts to streamline fund transfer processes, facilitating seamless transactions, ultimately rendering KYC (Know Your Customer) and AML (Anti-Money Laundering) practices obsolete.

   
   ### hash production
   
   **Keccak-256**
   
   Regarding this matter, please refer to our colleague [royal0721](https://github.com/CAFECA-IO/KnowledgeManagement/blob/master/alogrithm/keccak.md), who provides a comprehensive explanation.
   
   actual practice：
   
   <img width="548" alt="image" src="https://github.com/CAFECA-IO/KnowledgeManagement/assets/59311328/83c8b5f5-5f4a-4e1f-acff-064315ae76ac">

   <img width="593" alt="image" src="https://github.com/CAFECA-IO/KnowledgeManagement/assets/59311328/963b4a38-f49b-42a2-be4a-878fb1e8b25d">

   ### Encoding and Decoding Algorithm for Raw Transaction Data:

   #### Encoding

   1. Create Raw Transaction: Create a raw transaction using the provided parameters such as chain ID, transaction nonce, gas limit, recipient address, value, data, max priority fee, and max fee.

   2. Transaction Encoding: Encode the raw transaction using a TransactionEncoder object. This converts the transaction data into a specific format for transmission on the blockchain.
   3. Hash Calculation: Compute the hash of the encoded transaction using a hash function. This generates a unique digital digest used for subsequent signature verification.
   4. Sign Hash with Private Key: Sign the hash using your private key. This involves a mathematical operation to prove that the transaction was created by the owner of the private key.
   5. Convert Signature to Sign.SignatureData: Transform the signature into a specific data structure, typically Sign.SignatureData, to attach it to the raw transaction and broadcast it on the blockchain, thereby completing the transaction.

    ```
    public String prepareRawTransactionWithSignature(RawTransaction transaction, Sign.SignatureData signatureData) {
    // encode signature data
    List<RlpType> values = transaction.getTransaction().asRlpValues(signatureData);
    RlpList rlpList = new RlpList(values);
    byte[] encoded = RlpEncoder.encode(rlpList);
    if (!transaction.getType().equals(TransactionType.LEGACY)) {
    encoded = ByteBuffer.allocate(encoded.length + 1)
    .put(transaction.getType().getRlpType())
    .put(encoded)
    .array();
    }
    String serializedTxHex = Numeric.toHexString(encoded);
    log.info("Serialized tx {}", serializedTxHex);
    return serializedTxHex;
    }
    ```

	#### Decoding

    1. Obtain Raw Transaction Data: Firstly, it's necessary to obtain the raw transaction data to be decoded. This is typically provided in the form of a hexadecimal string, for example: 0x02c4c3010203. Convert the raw data into binary.

    2. The decoding process begins with converting the hexadecimal string into binary data. This is because the data encoded with RLP is stored in binary form.
    3. Start Decoding Process: The decoding process starts from the binary representation of the data. Initially, it groups bytes of binary data into smaller chunks, which contain the length of a data item and the actual data.
    4. Recursively Parse Data: Once a data item with a length prefix is detected, the decoder recursively enters that data item to parse its internal structure. This means RLP can handle complex data structures, including lists and nested data.
    5. Complete Decoding: The decoding process continues recursively parsing data items until the entire data structure is decoded into a human-readable form, such as arrays and objects in JavaScript. After decoding, the decoded data structure is accessible for data retrieval.
    	
   ### ECDSA:
	>Svetlin Nakov: **The ECDSA signing algorithm (RFC 6979) takes as input a message msg  a private key privKey** and produces as output a signature, which consists of a pair of integers {r, s}.
	>…The calculated signature {r, s} is a pair of integers, each in the range [1…n-1]. It encodes the random point R = k * G, along with a proof s, confirming that the signer knows the message h and the private key privKey. The proof s is by idea verifiable using the corresponding pubKey"
 
 	ECDSA (Elliptic Curve Digital Signature Algorithm) consists of two parts: signature creation algorithm and signature verification algorithm.

    The ECDSA signature creation algorithm (RFC 6979) takes a message msg (hash) and a private key privKey as input and produces a signature as output. This signature is composed of a pair of integers {r, s}.

    The calculated signature {r, s} is a pair of integers. It encodes the random point R = k * G and s, confirming that the signer knows the message and the private key. s can be verified using the corresponding pubKey.

#### Signature Creation Algorithm
 	
	When a private key signs a serialized transaction, a digital signature is created. In fact, the serialized transaction here is the Keccak256 hash value of the RLP encoded message. The mathematical function for signing the transaction is:

		S ig = Fsig(Fkeccak256(m), k)

	where： k = signature private key
	m= RLP encoding message
	Fkeccak256 = Keccak256 hash function	
	Fsig = Signature  Algorithm
	Sig = Produced Signature
	The function Fsig generates a signature (Sig), which consists of two values, r and s, aiding in signature verification. Sig = r, s.
    The ECDSA algorithm employs key pairs on the secp256k1 curve to achieve digital signature and verification.
	
	<img width="685" alt="image" src="https://github.com/CAFECA-IO/KnowledgeManagement/assets/59311328/137030a7-52c3-4083-933a-ac7edd0e3169">
 
#### Signature Verification Algorithm

	To verify a transaction, you must possess the signature (r and s), the serialized transaction, and the public key. The public key must correspond to the private key used during the initial signing of the transaction. The signature verification algorithm takes these listed components and returns a boolean value based on whether the signature is valid; true indicates a valid signature, while false indicates an invalid one.
	The verification process:

	1. Calculate the modular inverse of the signature proof, i.e., the inverse of the signature generation function: Determine the modulus N: You need to know the modulus N under which the modular inverse calculation will be performed. This is a positive integer. Choose the number a for which to compute the inverse: The number for which you want to find the inverse. Typically, a must be a positive integer modulo N. Calculate the inverse element x: To compute the inverse element x of a, you need to find a number x such that the following condition holds: (a * x) % N = 1. This means that the product of a and x modulo N equals 1.
 	2. Recover the random point r generated during signature.
  	3. Derive its x-coordinate from R': r' = R'.x
   	4. Calculate the signature verification result by comparing whether r' == r.

       Sveltin Nakov: "Signing a message involves encoding a random point R (represented only by its x-coordinate) through elliptic curve transformation using the private key privKey and the message hash h to produce a digital signature s. This serves as proof that the message signer knows the private key. Signature verification, on the other hand, decodes the proof number s from the signature using the public key pubKey and the message hash h, reconstructs the original point R, and compares the recovered x-coordinate of R with the r value in the signature."
       
   	
    In the signature verification function, an additional parameter v is introduced to help detect the correct value of r between two possible generated values, R and R'. If v is even, then R is the correct value; if v is odd, then R'. This helps determine which public key created the signature. The purpose is to ensure that the verifier can correctly recover the public key to validate the signature's validity.

### ECrecover
ecrecover is a global function in Solidity used for signature verification. It takes the message hash value and the signature verification variables v, r, s as inputs and returns an address. The returned address can then be compared with other addresses to find a match.

 		address signer = ecrecover(msgHash, v, r, s);
   
in solidity:

		pragma solidity ^0.5.0;
		contract SignatureVerifier {
			function verify(bytes32 messageHash, uint8 v, bytes32 r, bytes32 s) public pure returns (address) {
				bytes32 prefixedHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash));
				address signer = ecrecover(prefixedHash, v, r, s);
				require(signer != address(0), "Invalid signature");
				return signer;
			}
		}



  	
   


## References：
		1. https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md
		2. https://blockworks.co/news/ether-burn-hits-1-1b-after-eip-1559-activation
		3. https://abmedia.io/20220805-eip-1559-365-days
		4. https://consensys.net/blog/quorum/what-is-eip-1559-how-will-it-change-ethereum/
		5. https://morten.dev/posts/new-transaction-types-on-ethereum
		6. https://blog.bitmex.com/zh_cn-breaking-down-the-fee-market-eip-1559/
		7. https://notes.ethereum.org/@vbuterin/eip-1559-faq
		8. (keys production/secp256k1)https://betterprogramming.pub/understanding-ethereum-cryptography-3ef7429eddce
		9. (RLP)https://ethereum.org/en/developers/docs/data-structures-and-encoding/rlp/
		10. (eth white paper)https://ethereum.org/zh/whitepaper/
		11. (hash: keccak256)https://wiki.rugdoc.io/docs/introduction-to-ethereums-keccak-256-algorithm/
		12. (secp256k1)https://www.youtube.com/watch?v=vQ1-bQ4Jt5U
		13. (ecdsa)https://www.cs.miami.edu/home/burt/learning/Csc609.142/ecdsa-cert.pdf
		14. (ecdsa)https://www.youtube.com/watch?v=f9eitAS1nsY
		15. (ecdsa vs RSA)https://sectigostore.com/blog/ecdsa-vs-rsa-everything-you-need-to-know/
		16. (ecdsa vs rsa vs dsa)https://www.linkedin.com/advice/1/what-advantages-disadvantages-rsa-dsa-ecdsa-ssh
		17. (v,r,s)https://coinsbench.com/understanding-digital-signatures-the-role-of-v-r-s-in-cryptographic-security-and-signature-b9d2b89bbc0c
		18. (ecdsa)https://cryptobook.nakov.com/digital-signatures/ecdsa-sign-verify-messages
  		19. (decode raw transaction data)https://towardsdatascience.com/decoding-ethereum-smart-contract-data-eed513a65f76
    	20. (ecrecover) https://soliditydeveloper.com/ecrecover
      	21. (decode)https://snakecharmers.ethereum.org/web3-py-patterns-decoding-signed-transactions/




