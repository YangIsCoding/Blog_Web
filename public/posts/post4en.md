# EIP-1559 raw transaction algorithm, and RLP decode
### say we have a EIP-1559 raw transaction sample found on etherescan:

```
 	0x02f902fa0181b483a6792e850244ddce8e83045ee9943fc91a3afd70395cd496c647d5a6cc9d4b2b7fad8802c68af0bb140000b902843593564c000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000006508457f00000000000000000000000000000000000000000000000000000000000000020b080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000002c68af0bb1400000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000002c68af0bb140000000000000000000000000000000000000000000000001886271c2fb90c220a4d00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000003850952491606a0e420eb929b1a2e1a450d013f1c001a08b50ee3e376edb0fc0719ecb19a38dd7558285ba61b15c30083369bb76bfb393a069dc859312719259201ffae0c78208abc1b4e93ed05fd782f754dbe9eec75231
```

Decode this we get JSON object：

```json
	{
	  "chainId": "1",
	  "type": "EIP-1559",
	  "valid": true,
	  "hash": "0x9d0de6855390ff87e9fe9ca8a8e07e6a8819f29531ea69dc701f96268080440d",
	  "nonce": "180", 
	  "gasLimit": "286441",
	  "maxFeePerGas": "9745321614", 
	  "maxPriorityFeePerGas": "10909998", 
	  "from": "0x7C71e3C2dC48557336961e0adc390164C8b045b6",
	  "to": "0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad",
	  "publicKey": "0x042e53305a01238bbb049d4f4d4c06b9aabaf42297bb2368f9263fb2e155fd9fce02bdd0e0e1a97632e4da7e11605423563a70fe78c146ab4ee89f234204f60d0c",//
	  "v": "01",
	  "r": "8b50ee3e376edb0fc0719ecb19a38dd7558285ba61b15c30083369bb76bfb393",
	  "s": "69dc859312719259201ffae0c78208abc1b4e93ed05fd782f754dbe9eec75231",
	  "value": "200000000000000000", 
	  "data": "0x3593564c000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000006508457f00000000000000000000000000000000000000000000000000000000000000020b080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000002c68af0bb1400000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000002c68af0bb140000000000000000000000000000000000000000000000001886271c2fb90c220a4d00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000003850952491606a0e420eb929b1a2e1a450d013f1",//
	  "functionHash": "0x3593564c",//
	  "possibleFunctions": [
	    {
	      "definition": "execute(bytes,bytes[],uint256)",//
	      "decodedInputs": [
	        "0b08",//
	        [
	          "000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000002c68af0bb140000",
	          "000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000002c68af0bb140000000000000000000000000000000000000000000000001886271c2fb90c220a4d00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000003850952491606a0e420eb929b1a2e1a450d013f1"//
	        ],
	        "1695040895"//
	      ]
	    }
	  ]
    } 
```
   ### content

   1.  chianId:1 represents the Ethereum mainnet (Additionally: "3" represents Ropsten, which uses the PoW algorithm, "4" represents Rinkeby, which is a PoA test network of Ethereum, "42" represents Kovan, which uses the Clique algorithm, "100" represents xDai, which provides fast transactions. Other chainIDs can be found on [chainlist.org](https://chainlist.org/)).

   2. "Type:EIP-1559": Represents the transaction type.

   3. "valid:true": Indicates that the transaction is valid and can be processed.

   4. "hash": A unique identifier, a hexadecimal string similar to a receipt, used as proof that the transaction has been verified and added to the blockchain. In many cases, the hash is required to trace the funds.

   5. "nonce": A counter for the sender's address that ensures transactions are processed in the correct order and prevents double-spending. For this transaction, it's the 180th transaction from the user's wallet (180 = b4).

   6. "gaslimit": The maximum Gas limit for this transaction.

   7. "maxFeePerGas": Specifies the maximum amount the user is willing to spend on the Ethereum blockchain. (The max amount of money that Eth user willing to spend)

   8. "maxPriorityFeePerGas" The maximum tip amount the user is willing to pay.

   9. "from","to": The Ethereum addresses of the user and the recipient.

   10. "publicKey": The Ethereum public key is a set of x and y coordinates that satisfy the elliptic curve equation. It is derived from the private key using elliptic curve multiplication, which is a one-way process, meaning the private key cannot be derived from the public key. See the algorithm section for more details.

   12. "v","r","s": rr and s are outputs of the ECDSA (Elliptic Curve Digital Signature Algorithm) signature, and v is the recovery ID.

   13. "value": The amount of Ether in Wei. In this transaction, it is 200,000,000,000,000,000 Wei, which is equivalent to 0.2 Ether.

   14. "data": The function call and its parameters.

   15. "functionHash": The hash value of the function called in the data field.

   16. "possibleFunctions"： Indicates that the function named 'execute(bytes,bytes[],uint256)' was called, with specific decoded inputs provided.

### Decode Process

| Syntex      | Description |
| ------------------------ | --------------------|
| 0x02     | EIP-1559       |
| F9   | F9 = f7 + 2 (The last 2 bytes (4 characters) tell you the length of the entire message.)         |
| 02fa      | 02fa = 762, 762*2 = 1524     |
| 01      | chainID       |
| 81 b4(decimal:180)      | Nonce       |
| 83 a6792e      | maxPriorityFeePerGas       |
| 85 0244ddce8e      | maxFeePerGas       |
| 83 045ee9      | gasLimit       |
| 94 3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad      | To       |
| 88 02c68af0bb140000      | Value       |
|b9 0284 |b9>b7(185 >183),185-183 = 2,The last 2 bytes (4 characters) tell you the length of the data (0284 = 644).|
| 3593564c000000...~C0      | Data       |
| 84 3593564c      | Function hash       |
| 6508457f      | unit256       |
| 0b08      | decode input[0]       |
|   0000000...0000000000000000002c68af0bb140000    | decode input[1,0]       |
|   ...2000000...0000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000...003850952491606a0e420eb929b1a2e1a450d013f1| decode input[1,1]       |
| 6508457f(1695040895)      | decode input [2]       |
|c0|An empty list indicates the end of the data section and the beginning of the VRS signature part.|
|01|V|
|a0|separator|
|8b50ee3e376edb0fc0719ecb19a38dd7558285ba61b15c30083369bb76bfb393|R|
|a0|separator|
|69dc859312719259201ffae0c78208abc1b4e93ed05fd782f754dbe9eec75231|S|

//