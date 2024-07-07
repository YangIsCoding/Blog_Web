# EIP-1559

## 什麼是Ethereum Improvement proposals - 1559

>*Vitalik Buterin: A transaction pricing mechanism that includes fixed-per-block network fee that is burned and dynamically expands/contracts block sizes to deal with transient congestion.*

在2021年8月5日EIP-1559出現以前， 瓦斯費是由市場**競標**而來，每一筆交易可以設定一個用戶願意給付的瓦斯費，當網絡變得繁忙時，也就是有很多交易需要處理的時候，礦工（負責處理交易的節點）會優先處理那些支付更高瓦斯價格的交易。然而，這種競標系統導致不穩定的瓦斯價格，因為用戶需要在每次交易時**猜測**應該支付多少瓦斯費，取決於其他用戶的出價。

EIP-1559（為五個倫敦網路升級提案中其一）宗旨就在於改變現有的瓦斯費計算模式使其可以**調度離尖峰交易量**，並且取代競標模式，在EIP-1559下，瓦斯費將由兩個組成部分組成 - **基礎費(Base Fee)**和**小費(Tips)**。基礎費將是所有用戶都必須支付的標準費用，它將根據網絡流量由網絡計算(但這種計算是可預測的)而得。小費將是用戶可以支付的可選額外費用，以加快他們的交易速度。

	如果上一個區塊剛好為50%滿，基礎費用將保持不變。
	如果上一個區塊為100%滿，基礎費用將在下一個區塊中最多增加12.5%。
	如果上一個區塊超過50%但不滿100%滿，基礎費用將以不到12.5%的幅度增加。
	如果上一個區塊為0%滿 - 也就是空的 - 基礎費用將在下一個區塊中最多減少12.5%。
	如果上一個區塊超過0%但不滿50%滿，基礎費用將以不到12.5%的幅度減少。

EIP-1559還要求網絡**燒毀**用於支付基礎費用的以太幣代幣(Ether Bruning)。這個程序將減少以太幣代幣的總供應量，使以太幣變得更加稀缺，因此更有價值，也能利用這個手段對以太幣的通膨進行控制。而且在EIP-1559之前的礦工由高到低排好了要打包的交易之後，他可以把出價最低的幾筆交易換掉，故意自己製造一些高手續費的無用交易，反正手續費最後都會回到礦工身上，而且墊高最低手續費後，排在前面的交易也要付更多錢給礦工。

所以一旦以太坊實施EIP-1559，希望正常交易處理速度的用戶可以支付基礎費（將其銷毀），而希望更快交易處理速度的用戶可以添加小費（礦工費用），就不用迫使用戶猜測所需費瓦斯費了。

## 交易格式
用了一種新型的 EIP-2718 交易格式，這些參數使用RLP（Recursive Length Prefix）格式進行序列化， 格式如下： 

	0x02 || rlp([chain_id, nonce, max_priority_fee_per_gas, max_fee_per_gas, gas_limit, destination, amount, data, access_list, signature_y_parity, signature_r, signature_s])
 
- Gas 價格已替換為「每種 Gas 的最大優先費」和「每種 Gas 的最大費用」。
- **chain ID是單獨編碼**的，而不是包含在簽名v值中。這實質上以更簡單的實作取代了 EIP-155(v = recid+ chainID*2+ 35)。
- 簽名v值現在是一個簡單的奇偶校驗位元（「簽名 Y 奇偶校驗」），它是 0 或 1，取決於應使用橢圓曲線上的哪個點。

每單位瓦斯的基本費用，它每個區塊都可以根據一個公式上下調整，該公式是父區塊中使用的瓦斯和父區塊的瓦斯目標（瓦斯限制(gas limit)乘以以彈性倍增器(elastic multiplier)）的函數。

該算法導致基本每單位瓦斯的費用在區塊超過瓦斯目標時增加，而在區塊低於瓦斯目標時減少。基本每單位瓦斯費用會被銷毀。交易會指定他們願意支付給礦工的每單位瓦斯的最高費用，以鼓勵他們包括他們的交易（也就是優先費用）。交易還會指定他們願意支付的每單位瓦斯的最高總費用（即：最大費用），該費用包括優先費用和區塊的每單位瓦斯網絡費用（即：基本費用）。該交易將始終支付包括在其所在區塊中的基本每單位瓦斯費用，並且只要兩種費用的總額不超過交易的最高每單位瓦斯費用，它們將支付在交易中設置的優先費用每單位瓦斯。若交易總費用大於最高每單位瓦斯費用的話，交易則將無法被區塊鏈網絡接受和處理。
![](https://blog.bitmex.com/wp-content/uploads/2021/05/Screenshot-2021-05-11-at-13.21.34-1024x512.png)


## Specification

1.As of FORK_BLOCK_NUMBER, a new EIP-2718 transaction is introduced with TransactionType 2..

2.新交易的固有成本是從 EIP-2930 繼承而來的:

	21000 + 16 * non-zero calldata bytes + 4 * zero calldata bytes + 1900 * access list storage key count + 2400 * access list address count

3.此交易的 EIP-2718 TransactionPayload 為:

	rlp([chain_id, nonce, max_priority_fee_per_gas, max_fee_per_gas, gas_limit, destination, amount, data, access_list, signature_y_parity, signature_r, signature_s])

4.此交易中的 signature_y_parity、signature_r 和 signature_s 元素表示對:

	keccak256(0x02 || rlp([chain_id, nonce, max_priority_fee_per_gas, max_fee_per_gas, gas_limit, destination, amount, data, access_list])) 
 的 secp256k1 簽名。

5.交易的 EIP-2718 ReceiptPayload 包括以下參數：

	rlp([status, cumulative_transaction_gas_used, logs_bloom, logs])

## 向後兼容性
傳統的以太坊交易仍然可以正常運行並被包含在區塊中，但它們將無法直接從新的價格系統中受益。這是因為從傳統交易升級到新交易將導致傳統交易的 gas_price 完全被 base_fee_per_gas 和 priority_fee_per_gas 消耗。
- Block Hash Changing
  
Since Block Hash is Changing 所有驗證區塊或使用區塊哈希驗證區塊內容的應用程序將需要適應新的數據結構（增加了一個額外的項目）。如果只取區塊標頭byte並對其進行哈希運算，仍然可以正確獲得哈希值，但如果從其組成元素構建區塊標頭，則需要在末尾添加新的元素。
- Gas Price
  
在此變更之前，GASPRICE 同時代表了簽名者每個 gas 單位支付的以太幣，以及礦工每個 gas 單位獲得的以太幣。從這次變更開始，GASPRICE 現在僅代表了簽名者每個 gas 單位支付的以太幣，礦工獲得的交易費用不再可以直接在 EVM 中訪問，這麼做可以使用戶所需的費用變得更清晰。

## Security Considerations
### 增加最大區塊大小/複雜性
EIP-1559將增加最大區塊大小，這可能會引起問題，如果礦工無法快速處理一個區塊，那麼他們將被迫挖掘一個空區塊。隨著時間的推移，平均區塊大小應該保持與沒有這個提案相同，所以這只是一個短期區塊大小暴增的問題。有可能一個或多個客戶端無法很好地處理短期區塊大小暴增，導致錯誤（例如內存不足或類似的錯誤），客戶端實現應確保它們的客戶端能夠適當地處理個別區塊，直到達到最大大小。

### 交易排序
由於大多數人不再基於優先費用競爭，而是使用基準費用來確保被包含在內，交易的排序現在取決於個別客戶端的內部實現細節，例如它們如何在內存中存儲交易。建議將具有相同優先費用的交易按照接收交易的時間進行排序，以保護網絡免受垃圾攻擊，其中攻擊者將大量交易放入待處理池，以確保至少有一個交易處於有利位置。礦工仍應根據自私挖掘的角度選擇高優先費用的交易，而不是低優先費用的交易。

### 礦工挖掘空區塊
有可能礦工會挖掘空區塊，直到基礎費用非常低，然後開始挖掘半滿區塊，並重新按優先費用排序交易。雖然這種攻擊是可能的，但它並不是一個特別穩定的均衡狀態，只要挖礦是去中心化的。任何從這種策略中叛逃的礦工將比參與攻擊的礦工更有利可圖，即使在基礎費用達到0之後也是如此。由於任何礦工都可以匿名叛逃，而且無法證明特定礦工叛逃，所以唯一可行的執行這種攻擊的方式是控制50%或更多的算力。如果攻擊者擁有確切的50%算力，他們將不會從優先費用中獲得以太幣，而叛逃者將從優先費用中獲得兩倍的以太幣。對於攻擊者要實現盈利，他們需要擁有50%以上的算力，這意味著他們可以執行雙重支付攻擊，或者簡單地忽略任何其他礦工，這是一種更有利可圖的策略。

### ETH銷毀將排除固定供應
通過銷毀基礎費用，我們無法再保證以太幣供應的固定性。這可能導致經濟不穩定，因為長期以來以太幣的供應將不再保持恆定。儘管這是一個有效的擔憂，但很難量化其影響。如果銷毀的基礎費用多於挖礦獎勵所產生的，那麼ETH將是通縮的；如果挖礦獎勵多於銷毀的，那麼ETH將是通膨的。由於我們無法控制用戶對區塊空間的需求，所以我們現在無法斷言ETH最終會是通膨還是通縮，因此這個變化使核心開發者對以太的長期供應失去了一些控制。

### 可能集中化
Sergio Demian Lerner提出擔憂，EIP-1559可能導致礦池在網絡中佔主導地位，形成集中化現象。在減少礦工收入模型下，小型礦工可能難以競爭，進一步集中化可能威脅到網絡的去中心化性質。

## News about EIP-1559
1. Ether Burn Hits $1.1B After EIP-1559 Activation, by JACQUELYN MELINEK / SEPTEMBER 29, 2021
根據超音波貨幣追蹤器的數據，截至本文發佈時，大約 386,466 ETH（約 11 億美元）已被燒毀，8 月 5 日實施 EIP-1559 以來，已燒毀價值超過 10 億美元的以太幣，達到了加密貨幣的另一個里程碑。以太坊稍微處於通縮期，但一旦以太坊區塊鏈在 2022 年轉變為權益證明系統，成為以太坊 2.0 的一部分，預計將更頻繁地面臨更大的通縮期。
2. EIP-1559實施365天：NFT協議燒幣量大於DeFi, by Elponcho / August 5, 2022
根據 ultrasound.money，365 天以來燒毀了約 260 萬個以太幣，基於 PoW 共識發行了 550 萬個以太幣，整體來說，為以太幣總流通量帶來 2.4% 的年增幅，365 天以來，每分鐘燒毀 4.89 個以太幣被燒毀，抵銷發行 0.47 x。在不同的類型交易中，NFT 活動所銷毀的以太幣，勝過 DeFi 活動，也彰顯了過去一年 NFT 的興盛與 DeFi 的降溫，其次為套利活動 MEV，以及其他活動。

## EIP-1559 raw transaction sample and algorithm
   ## 演算法
   ### RLP(recurrsivep-length prefix):
RLP標準化了在節點之間以節省空間的方式傳輸數據。RLP的目的是將任意嵌套的二進制數據數組編碼，正整數的RLP必須以大端二進制形式表示，不帶前導零（從而使整數值零等同於空byte數組），帶前導零的反序列化正整數被視為無效。
#### Definition
- RLP 函數接受一個項目，項目的定義：字串是一個項目，列表(list)是一個項目
- 在以太坊中，RLP是資料序列化/反序列化的主要方法，區塊、交易等資料結構在永久化時會先經過RLP編碼後再存儲到數據庫中
#### 要使用RLP編碼字典，兩種規範形式如下：
1. 使用[[k1,v1],[k2,v2]...]，其中鍵按字典序排列
2. 使用以太坊所採用的高級帕特里夏樹編碼方法
#### RLP encoding defination
1. 對於一個單byte，其值在 [0x00, 0x7f]（十進制 [0, 127]）範圍內，該byte本身就是它自己的RLP編碼。
2. 否則，如果一個字符串的長度為0到55bytes，則RLP編碼包括一個值為0x80（十進制128）的byte，接著是字符串的長度，然後是字符串本身。因此，第一個byte的範圍是 [0x80, 0xb7]（十進制 [128, 183]）。
3. 如果一個字符串的長度超過55bytes，那麼其RLP編碼由以下部分組成第一個byte的數值是0xb7（十進制183）加上字符串長度的長度（即byte數的二進制表示的長度）的byte數。接著是字符串的長度。最後是字符串本身。
4. 如果一個列表的總有效載荷（即其所有項目的組合長度，經過RLP編碼後）長度在0到55byte之間，那麼RLP編碼由以下部分組成：第一個byte的數值是0xc0加上列表的長度。接著是所有項目的RLP編碼的串聯。在這種情況下，第一個byte的範圍是 [0xc0, 0xf7]（十進制 [192, 247]）。
5. 如果一個列表的總有效載荷超過55byte，那麼RLP編碼由以下部分組成：第一個byte的數值是0xf7加上有效載荷長度的長度（即byte數的二進制表示的長度）。接著是有效載荷的長度。最後是所有項目的RLP編碼的串聯。在這種情況下，第一個byte的範圍是 [0xf8, 0xff]（十進制 [248, 255]）。

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

1. 如果前綴的範圍在 [0x00, 0x7f] 內，則該數據被視為字符串，並且該字符串就是第一個byte本身；
2. 如果第一個byte的範圍在 [0x80, 0xb7] 內，則該數據被視為字符串，並且該字符串的長度等於第一個byte減去 0x80，然後跟隨在第一個byte之後；
3.如果第一個byte的範圍在 [0xb8, 0xbf] 內，則該數據被視為字符串，並且字符串的長度（以byte為單位）等於第一個byte減去 0xb7，然後跟隨在第一個byte之後，接著是字符串的內容；
4.如果第一個byte的範圍在 [0xc0, 0xf7] 內，則該數據被視為列表，其中所有項目的總有效載荷等於第一個byte減去 0xc0，然後跟隨在第一個byte之後，接著是列表中所有項目的RLP編碼的串聯；
5.如果第一個byte的範圍在 [0xf8, 0xff] 內，則該數據被視為列表，列表的長度等於第一個byte減去 0xf7，然後跟隨在第一個byte之後，接著是列表的總有效載荷，最後是列表中所有項目的RLP編碼的串聯。

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


   ### private key 產生：
   產生金鑰的第一步也是最關鍵的一步是找到安全的熵來源或隨機性來源。產生以太坊私鑰需要選擇 1 到 2²⁵⁶ 之間的數字。以太坊軟體使用作業系統的隨機數產生器來產生 256 個隨機位元。
   ### public key 產生：
   公鑰是橢圓曲線上滿足橢圓曲線方程式的一組 x 和 y 座標。它是透過使用橢圓曲線乘法從私鑰產生的兩個數字得出的。這個過程是不可逆的，這意味著私鑰不能從公鑰推導出來。
   
	  	K = k * G
   
   其中K為公鑰，k為私鑰，G為常數點（生成點）
   
   ![](https://miro.medium.com/v2/resize:fit:1200/format:webp/0*n5t8Gfv2NejIvwAq.png)
   
   以太坊使用secp256k1產生橢圓曲線，定義如下：
   
		y ² = ( x ³ + 7 ) 超過 ( 𝔽 p )
		或者：
		y ² |p| = ( x3 + 7 ) |p|

   表示mod p該曲線位於素數階有限域上p，其中p = 2²⁵⁶–2³²–2⁹–2⁸–2⁷–2⁶–2⁴–1。這是一個非常大的質數，這使得這條曲線非常可靠。
   
   **我們可以使用npm中的helpeth來生產公私鑰**
   
   ![image](https://github.com/CAFECA-IO/KnowledgeManagement/assets/59311328/fd4b21cc-a119-4877-a2b3-1af502fdf6b0)

   - (補充)ICAP（互換客戶端地址協議）是一種客戶端地址協議，它是與IBAN（國際銀行帳號）兼容的系統，旨在引用和處理客戶帳戶，以簡化資金轉移流程，使交易無縫進行，最終讓KYC（認識您的客戶）和AML（反洗錢監管）成為過去時的事情。

   
   ### hash 產生：
   
   **Keccak-256**
   
   關於這部分內容請參閱：我們的同事[royal0721](https://github.com/CAFECA-IO/KnowledgeManagement/blob/master/alogrithm/keccak.md)那裡有著詳盡的解釋。
   
   實際運行：
   
   <img width="548" alt="image" src="https://github.com/CAFECA-IO/KnowledgeManagement/assets/59311328/83c8b5f5-5f4a-4e1f-acff-064315ae76ac">

   <img width="593" alt="image" src="https://github.com/CAFECA-IO/KnowledgeManagement/assets/59311328/963b4a38-f49b-42a2-be4a-878fb1e8b25d">

   ### 編碼與解碼原始交易數據演算法：
	#### 編碼
	1. 創建原始交易：使用提供的參數（如鏈ID、交易序號、燃氣限制、接收地址、價值、數據、最大優先手續費和最大手續費）創建一個原始交易
	2. 交易編碼：使用TransactionEncoder對象將原始交易進行編碼。這可以將交易數據轉換為一種特定的格式，以便在區塊鏈上傳輸
	3. 哈希計算：使用哈希函數對編碼後的交易進行哈希計算。這可以生成一個唯一的數字摘要，用於後續簽名驗證
	4. 使用私鑰簽名哈希：使用您的私鑰對哈希進行簽名。這是一個數學運算，用於證明這筆交易是由私鑰擁有者創建的
	5. 簽名轉換為Sign.SignatureData：將簽名轉換為特定的數據結構，通常是Sign.SignatureData，以便將其附加到原始交易並在區塊鏈上進行廣播，從而完成交易。

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

	#### 解碼
	1. 獲取原始交易數據：首先，需要獲取要解碼的原始交易數據。這通常以十六進制字符串的形式提供，例如：0x02c4c3010203。將原始數據轉換為二進制
	2. 解碼過程始於將十六進制字符串轉換為二進制數據。這是因為 RLP 編碼的數據是以二進制形式存儲的。
	3. 開始解碼過程：解碼過程從數據的二進制表示開始。首先，它將二進制數據中的字節分組成更小的塊，這些塊包含一個數據項的長度和實際數據。
	4. 遞歸解析數據:一旦檢測到具有長度前綴的數據項，解碼器將遞歸進入該數據項，以解析其內部結構。這意味著 RLP 可以處理複雜的數據結構，包括列表和嵌套數據。
	5. 完成解碼:解碼過程繼續遞歸解析數據項，直到整個數據結構被解碼為易於理解的形式，例如 JavaScript 的數組和對象。解碼完成後，可以訪問解碼後的數據結構以獲取數據。
    	
   
   ### ECDSA:
	>Svetlin Nakov: "The ECDSA signing algorithm (RFC 6979) takes as input a message msg ****+ a private key privKey ****and produces as output a signature, which consists of a pair of integers {r, s}.
	>…The calculated signature {r, s} is a pair of integers, each in the range [1…n-1]. It encodes the random point R = k * G, along with a proof s, confirming that the signer knows the message h and the private key privKey. The proof s is by idea verifiable using the corresponding pubKey"
 
 	ECDSA）生成，該演算法由兩部分組成。第一部分是簽章創建演算法，第二部分是簽章驗證演算法。
	ECDSA 簽章演算法 ( RFC 6979 ) 將訊息msg(hash)+ 私鑰privKey 作為輸入，並加入簽章演算法產生簽章作為輸出，該簽章由一對整數 { r , s } 組成。
	計算出的簽章{ r , s } 是一對整數。它對隨機點R = k * G以及s進行編碼，確認簽署者知道訊息和私鑰。s可以使用相應的pubKey進行驗證。

	#### 簽章創建法
 	
	當私鑰簽署已經序列化的交易時，就會建立數位簽章。實際上，這裡的序列化交易是 RLP 編碼訊息的 Keccak256 雜湊值。簽名交易的數學函數為：

		S ig = Fsig(Fkeccak256(m), k)

	其中： k = 簽署私鑰
	m= RLP 編碼訊息
	Fkeccak256 = Keccak256 雜湊函數	
	Fsig = 簽名演算法
	Sig = 產生的簽名
	函數Fsig產生一個簽章 ( S ig )，該簽章產生兩個值r和s，這對於簽章驗證很有幫助。Sig = r, s
	ECDSA算法使用secp256k1曲線上的密鑰對來實現數字簽名和驗證，
	
	<img width="685" alt="image" src="https://github.com/CAFECA-IO/KnowledgeManagement/assets/59311328/137030a7-52c3-4083-933a-ac7edd0e3169">
 
	#### 簽章驗證法

	要驗證交易，必須擁有簽章（r和s）、序列化交易和公鑰
	該公鑰必須與最初簽署交易時使用的私鑰相對應。簽名驗證演算法採用這些列出的元件，並根據簽名是否有效傳回一個布林值；true 表示有效簽名， false 表示無效
	驗證過程：
	1. 計算簽章證明的模逆，即簽章產生函數的逆：確定模數N：需要知道要在其下執行模逆計算的模數N。這是一個正整數。選擇要計算逆的數字a：要找到其逆的數字。通常，a 必須是模數N的正整數。計算逆元素x：要計算a的逆元素x，需要找到一個數字x，使得以下條件成立：(a * x) % N = 1。這表示a和x的乘積在模N下等於1。
 	2. 從 x 座標恢復簽名期間產生的隨機點r
  	3. 從R'產生其x座標：r' = R' .x
   	4. 透過比較是否r' == r計算簽章驗證結果

       Sveltin Nakov:"簽章簽章使用私鑰privKey和訊息雜湊h透過橢圓曲線變換將隨機點R （僅由其 x 座標表示）編碼為數位s，這是訊息簽署者知道證明私鑰。簽章驗證使用公鑰pubKey和訊息雜湊h將簽章中的證明編號s解碼回其原始點R ，並將恢復的R的 x 座標與簽章中的r值進行比較"
   	簽章驗證函數中加入了v ，以協助偵測兩個可能產生值R和R' 之間r的正確值。如果v是偶數，則R是正確值，如果v是奇數，則R'，它有助於確定簽名是由哪個公鑰創建的。存在的目的是確保驗證者能夠正確地恢復公鑰，以驗證簽名的有效性。

### ECrecover
ECrecover是 Solidity 中用於簽章驗證的global function。它採用訊息哈希值和簽名驗證變數v、r、s，並傳回一個位址。然後可以將返回的地址與其他地址進行比較以找到匹配項。

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



  	
   


## 參考：
		1. https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md
		2. https://blockworks.co/news/ether-burn-hits-1-1b-after-eip-1559-activation
		3. https://abmedia.io/20220805-eip-1559-365-days
		4. https://consensys.net/blog/quorum/what-is-eip-1559-how-will-it-change-ethereum/
		5. https://morten.dev/posts/new-transaction-types-on-ethereum
		6. https://blog.bitmex.com/zh_cn-breaking-down-the-fee-market-eip-1559/
		7. https://notes.ethereum.org/@vbuterin/eip-1559-faq
		8. (公私鑰產生/secp256k1)https://betterprogramming.pub/understanding-ethereum-cryptography-3ef7429eddce
		9. (RLP)https://ethereum.org/en/developers/docs/data-structures-and-encoding/rlp/
		10. (以太坊白皮書)https://ethereum.org/zh/whitepaper/
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




