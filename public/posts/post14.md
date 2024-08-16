<style>
.circle-title {
    display: inline-block;
    padding: 10px;
    border: 2px solid black;
    border-radius: 50%;
    text-align: center;
}
</style>


# 算法重點
非常感謝代碼隨想錄前輩的精心資源，接下來的算法筆記是大多出自於此前輩，並沒有任何營利目的。

我在此基礎上加了我自己的筆記，以及仍存的疑問的解答，主要是用python寫。

當中的題號都是leetcode的題號。照著本篇順序一題一題解，相信會有很大的成長的。

請務必到：[代碼隨想錄](https://github.com/youngyangyang04/leetcode-master/tree/master)網站來看更齊全的資料。

## 目錄：

性能分析

數組:
1. [704 - binary search](#704)
2. [27 - remove element](#27)
3. [977 - Squares of a Sorted Array](#977)
4. [209 - Minimum Size Subarray Sum](#209)
5. [59 - Spiral Matrix 2](#59)

鏈表:
1. [203 - Remove Linked Lish Elements](#203)
2. [707 - Design Linked List](#707)
3. [206 - Reverse Linked List](#206)
4. [24 - Swap Nodes in Paris](#24)
5. [19 - Remove Nth Node From End of List](#19)
6. [160 - Intersection of Two Linked Lists](#160)
7. [142 - Linked List Cycle 2](#142)

hash table:
1. [242 - Valid Anagram](#242)
2. [1002 - Find Common Characters](#1002)
3. [349 - Intersection of Two Arrays](#349)
4. [202 - Happy Number](#202)
5. [1 - Two Sum](#1)
6. [454 - 4 Sum 2](#454)
7. [383 - Ransom Note](#383)
8. [15 - 3Sum](#15)
9. [18 - 4 sum](#18)

string:
1. [344 - reverse stirng](#344)
2. [541 - reverse string 2](#541)
3. [151 -  Reverse Words in a String](#151)
4. [28 - Find the Index of the First Occurrence in a String](#28)
5. [459 - Repeated Substring Pattern](#459)

## 性能分析:

大O用來表示上界的，當用它作為演算法的最壞情況運行時間的上界，就是對任意資料輸入的運行時間的上界。

## 數組:
<h1 class="circle-title">二分搜尋</h1>

<div id = "704" style="text-align: center;">
#704, Binary Search
</div>

```
給定一個 n 個元素有序的（升序）整型數組 nums 和一個目標值 target ，
寫一個函數搜索 nums 中的 target，如果目標值存在返回下標，否則返回 -1。

輸入: nums = [-1,0,3,5,9,12], target = 9     
輸出: 4       
解釋: 9 出現在 nums 中並且下標為 4     
```

二分查找涉及的很多的邊界條件，邏輯比較簡單，但就是寫不好。例如到底是 WHILE(LEFT < RIGHT) 還 是 WHILE(LEFT <= RIGHT)，到底是RIGHT = MIDDLE呢，還是要RIGHT = MIDDLE - 1呢?

寫二分法，區間的定義一般為兩種，左閉右閉即[LEFT, RIGHT]，或左閉右開即[ LEFT, RIGHT )。

*二分法第一種寫法:*

![](https://camo.githubusercontent.com/ff499aa858e7f57b04f432a733d7fa8df867d1d613403a156e46ab0c38266f6b/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f32303231303331313135333035353732332e6a7067)

第一種寫法，我們定義 TARGET 是在一個在左閉右閉的區間裡，也就是[LEFT, RIGHT] (這很重要非常重要)。

區間的定義這決定了二分法的代碼應該如何寫，因為定義TARGET在[LEFT, RIGHT]區間，所以有如下兩點:

1. WHILE (LEFT <= RIGHT) 要使用 <= ，因為LEFT == RIGHT是有意義的，所以使用 <=

2. IF (NUMS[MIDDLE] > TARGET) RIGHT 要賦值為 MIDDLE - 1，因為目前這個NUMS[MIDDLE]一定不
是TARGET，那麼接下來要找的左區間結束下標位置就是 MIDDLE - 1

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums) - 1 # 定義target在左閉右閉的區間裡，[left, right]
        while left <= right:
            middle = left + (right - left) // 2

            if nums[middle] > target:
            right = middle - 1 # target在左邊區間，所以[left, middle - 1]
            elif nums[middle] < target:
            left = middle + 1 # target在右邊區間，所以[middle + 1, right]
            else:
            return middle# 數組中找到目標值，直接傳回下標
        return -1 # 未找到目標值
```


*二分法第二種寫法:*

![](https://camo.githubusercontent.com/e5d8f3e2f3a09f669b49357974c9a265b8508778745f3402784b7f0aaa943bd9/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f32303231303331313135333132333633322e6a7067)

如果說定義 target 是在一個在左閉右開的區間裡，也就是[left, right) ，那麼二分法的邊界處理方式 則截然不同。

有如下兩點：

1. while (left < right)，這裡用 < ,因為left == right在區間[left, right)是沒有意義的

2. if (nums[middle] > target) right 更新為middle，因為當前nums[middle]不等於target，去左區間繼續尋找，而尋找區間是左閉右開區間，所以right更新為middle，即:下一個查詢區間不會去比較nums[middle]

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums) # 定義target在左閉右開的區間裡，即:[left, right)
        while left < right: # 因爲left == right的時候，在[left, right)是無效的空間，所以使用 < middle = left + (right - left) // 2
            if nums[middle] > target:
                right = middle # target 在左區間，在[left, middle)中
            elif nums[middle] < target:
                left = middle + 1 # target 在右區間，在[middle + 1, right)中
            else:
                return middle # 數組中找到目標值，直接返回下標
        return -1 # 未找到目標值
```

**補充：**

防止整數溢出:

當處理非常大的陣列或整數時，LEFT + RIGHT 的值可能超過整數的最大表示範圍，導致整數溢位。雖 然在 PYTHON 中這種情況不太可能發生，因為 PYTHON 的整數類型可以自動擴展，但在其他程式語言中 (如C、C++、JAVA)，整數溢位是一個實際的問題。

假設 LEFT 和 RIGHT 都是非常大的正整數，那麼 LEFT + RIGHT 可能會超過這些語言中的整數上 限(例如，在32位元系統中為2^31 - 1)。然而，LEFT + (RIGHT - LEFT) // 2 先計算 RIGHT - LEFT 來避免這種情況，因為 RIGHT - LEFT 不會超過 RIGHT 或 LEFT 的範圍。

<h1 class="circle-title">雙指針法</h1>


<div id = "27" style="text-align: center;">
#27, Remove Element
</div>

```
在數組內移除特定元素
```

雙指針法(快慢指針法): 透過一個快指針和慢指針在一個FOR循環下完成兩個FOR循環的工作。 定義快慢指針

1. 快指針:尋找新數組的元素 ，新數組就是不含有目標元素的數組

2. 慢指針:指向更新 新數組下標的位置

```python
class Solution:
    def removeElement(self, nums: List[int], val: int) -> int: fast = 0
        slow = 0
        while fast < len(nums):
            if nums[fast] != val: 
                nums[slow] = nums[fast] 
                slow += 1
            fast += 1 
        return slow
```

<div id = "977" style="text-align: center;">
#977, Squares of a Sorted Array
</div>

```
給你一個按 非遞減顺序 排序的整數數組 NUMS，返回 每個數字的平方 組成的新數組，要求也按 非遞減顺 序 排序。
示例 1:
1. 輸入:NUMS = [-4,-1,0,3,10]
2. 輸出:[0,1,9,16,100]
3. 解釋:平方後，數組變為 [16,1,0,9,100]，排序後，數組變為 [0,1,9,16,100]
```

數組其實是有序的， 只不過負數平方之後可能成為最大數了。 那麼數組平方的最大值就在數組的兩端，不是最左邊就是最右邊，不可能是中间。 此時可以考慮雙指針法了，I指向起始位置，J指向終止位置。 定義一個新數組RESULT，和A數組一樣的大小，讓K指向RESULT數組終止位置。

```python
class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        res = []
        left = 0
        right = len(nums)-1 
        while left<=right:
            if nums[left]*nums[left] < nums[right]*nums[right]: 
                res.appendleft(nums[right]*nums[right])
                right -=1
            else: 
                res.appendleft(nums[left]*nums[left]) 
                left+=1
        return res
```

**但是 [] LIST 不能使用APPENDLEFT, 要改成RES = COLLECTIONS.DEQUE()才可以。**


<div id = "209" style="text-align: center;">
#209, Minimum Size Subarray Sum
</div>

```
給定一個含有 N 個正整數的數組和一個正整數 S ，找出該數組中滿足其和 ≥ S 的⻓度最小的 連續 子數組， 並返回其⻓度。如果不存在符合條件的子數組，返回 0。

示例:
1. 輸入:S = 7, NUMS = [2,3,1,2,4,3]
2. 輸出:2
3. 解釋:子數組 [4,3] 是該條件下的⻓度最小的子數組。
```

首先要思考 如果用一個FOR循環，那麼應該表示 滑動窗口的起始位置，還是終止位置。 如果只用一個FOR循環來表示 滑動窗口的起始位置，那麼如何遍曆剩下的終止位置? 此時难免再次陷入 暴力解法的怪圈。
所以 只用一個FOR循環，那麼這個循環的索引，一定是表示 滑動窗口的終止位置

```python
class Solution
    def minSubArrayLen(self, target: int, nums: List[int]) -> int: 
        min_len = float('inf')
        cur_sum = 0
        cur_len = 0
        start = 0
        for end in range(len(nums)):
            cur_sum += nums[end] 
            cur_len += 1
            while cur_sum >= target:
                min_len = min(cur_len,min_len) cur_sum -= nums[start]
                start += 1
                cur_len -= 1
                if min_len == float('inf'): 
                    return 0
        return min_len
```

<h1 class="circle-title">螺旋矩陣</h1>

<div id = "59" style="text-align: center;">
#59, Spiral Matrix 2
</div>

```
給定一個正整數 N，生成一個包含 1 到 N^2 所有元素，且元素按顺時針顺序螺旋排列的正方形矩阵。 示例:
輸入: 3 輸出: [ [ 1, 2, 3 ], [ 8, 9, 4 ], [ 7, 6, 5 ] ]

一定要堅持循環不變量原則。 而求解本题依然是要堅持循環不變量原則。 模擬顺時針畫矩阵的過程:

1. 填充上行從左到右 
2. 填充右列從上到下 
3. 填充下行從右到左 
4. 填充左列從下到上
```

由外向內一圈一圈這麼畫下去。 可以發現這裏的邊界條件非常多，在一個循環中，如此多的邊界條件，如果不按照固定規則來遍曆，那就是一 進循環深似海，從此OFFER是路人。 這裏一圈下來，我們要畫每四條邊，這四條邊怎麼畫，每畫一條邊都要堅持一致的左闭右開，或者左開右闭的 原則，這樣這一圈才能按照統一的規則畫下來。

```python
from typing import List
class Solution:
    def generateMatrix(self, n: int) -> List[List[int]]:
    # 初始化 n x n 矩阵
    matrix = [[0] * n for _ in range(n)]
    num = 1
    left, right, top, bottom = 0, n - 1, 0, n - 1
    while left <= right and top <= bottom:
        # 從左到右填充顶行
        for i in range(left, right + 1):#left 到 right 表示當前顶行從左到右的范圍，包括
            right，因此使用 right + 1。
            matrix[top][i] = num
            num += 1
            top += 1# 填充完顶行，顶行邊界下移

        # 從上到下填充右列
        for i in range(top, bottom + 1):#top 到 bottom 表示當前右列從上到下的范圍，包括 bottom，因此使用 bottom + 1。
            matrix[i][right] = num
            num += 1
            right -= 1# 填充完右列，右列邊界左移

        if top <= bottom:
            # 從右到左填充底行
            for i in range(right, left - 1, -1):
                matrix[bottom][i] = num
                num += 1 bottom -= 1

        if left <= right:
            # 從下到上填充左列
            for i in range(bottom, top - 1, -1):
                matrix[i][left] = num
                num += 1 left += 1
    return matrix
```

為什只有# 從右到左填充底行 # 從下到上填充左列 需要特別檢查?

只有從右到左填充底行和從下到上填充左列需要特別檢查，是因為在這些步骤之前已經改變了 TOP 和 RIGHT 邊界，這可能導致這些邊界條件在某些情況下已經不再滿足。例如，當矩阵中只剩下一行或一列需要填充時，更新後的 TOP 或 RIGHT 可能會越過 BOTTOM 或 LEFT 邊界，導致不再需要執行這些步骤。

## 鏈表:


定義：
```python
class ListNode:
    def __init__(self, val = 0, next = None):
        self.val = val
        self.next = next
```

<div id = "203" style="text-align: center;">
#203, Remove Linked Lish Elements
</div>

```
题意:刪除鏈表中等於給定值 VAL 的所有節點。
示例 :
1. 輸入:HEAD = [1,2,6,3,4,5,6], VAL = 6 輸出:[1,2,3,4,5]
2. 輸入:HEAD = [], VAL = 1 輸出:[]
3. 輸入:HEAD = [7,7,7,7], VAL = 7 輸出:[]
```

```python
class Solution:
def removeElements(self, head: Optional[ListNode], val: int) -> Optional[ListNode]:         
    dummy = ListNode()
    dummy.next = head
    pointer = dummy
    while pointer.next:
        if pointer.next.val == val:
            pointer.next = pointer.next.next 
        else:
            pointer = pointer.next 
    return dummy.next
```


如果RETURN HEAD代表什麼?

如果在你的代碼中直接返回 HEAD 而不是 DUMMY.NEXT，那麼會存在以下问题:

1. 未處理頭節點的情況:如果需要刪除的節點正是鏈表的頭節點(即 HEAD 本身)，在刪除操作後， HEAD 仍然指向原來的頭節點，這樣返回的鏈表仍然包含需要刪除的頭節點。

2. 未更新鏈表頭部:使用虛擬頭節點(DUMMY NODE)的目的是為了簡化刪除操作，特別是當頭節點 需要被刪除時。如果你在刪除操作後直接返回 HEAD，就無法處理這種情況。

<div id = "707" style="text-align: center;">
#707, Design Linked List
</div>

```
在鏈表類中實現這些功能:
1. GET(INDEX):獲取鏈表中第 INDEX 個節點的值。如果索引無效，則返回-1。
2.  ADDATHEAD(VAL):在鏈表的第一個元素之前添加一個值為 VAL 的節點。插入後，新節點將成為鏈表 的第一個節點。
3. ADDATTAIL(VAL):將值為 VAL 的節點追加到鏈表的最後一個元素。
4. ADDATINDEX(INDEX,VAL):在鏈表中的第 INDEX 個節點之前添加值為 VAL 的節點。如果 INDEX 等
於鏈表的⻓度，則該節點將附加到鏈表的末尾。如果 INDEX 大於鏈表⻓度，則不會插入節點。如果
INDEX小於0，則在頭部插入節點。
5. DELETEATINDEX(INDEX):如果索引 INDEX 有效，則刪除鏈表中的第 INDEX 個節點。
```

```python
class ListNode:
    def __init__(self,val = 0, next = None):
        self.val = val
        self.next = next

class MyLinkedList:
    def __init__(self):
        self.dummy = ListNode()
        self.size = 0

    def get(self, index: int) -> int:
        if index < 0 or index >= self.size:
            return -1
        current = self.dummy.next
        for i in range(index):
            current = current.next
        return current.val

    def addAtHead(self, val: int) -> None:
        self.dummy.next = ListNode(val,self.dummy.next)
        self.size+=1

    def addAtTail(self, val: int) -> None:
        current = self.dummy
        for i in range(self.size):
            current = current.next
        current.next = ListNode(val)
        self.size += 1
        
    def addAtIndex(self, index: int, val: int) -> None:
        if index < 0 or index > self.size:
            return
        current = self.dummy
        for i in range(index):
            current = current.next
        current.next = ListNode(val,current.next)
        self.size+=1


    def deleteAtIndex(self, index: int) -> None:
        if index < 0 or index >= self.size:
            return
        
        current = self.dummy
        for i in range(index):
            current = current.next
        current.next= current.next.next
        self.size-=1


# Your MyLinkedList object will be instantiated and called as such:
# obj = MyLinkedList()
# param_1 = obj.get(index)
# obj.addAtHead(val)
# obj.addAtTail(val)
# obj.addAtIndex(index,val)
# obj.deleteAtIndex(index)
```

SELF.DUMMY.NEXT = LISTNODE(VAL,SELF.DUMMY.NEXT) 等於 

NEW_NODE = LISTNODE(VAL, SELF.DUMMY.NEXT)

SELF.DUMMY.NEXT = NEW_NODE

<h1 class="circle-title">LL中的遞迴與遍歷</h1>
<div id = "206" style="text-align: center;">
#206, Reverse Linked List
</div>

```
反轉LL:
```

Iterative:
```python
class Solution:
    def reverseList(self, head: Optional[ListNode]) ->Optional[ListNode]:
        prev = None
        while head:
            next_node = head.next
            head.next = prev
            prev = head
            head = next_node
        return prev
```
Recursion:

```python
class Solution:
    def reverseList(self, head:Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head
        new_node = self.reverseList(head.next)
        head.next.next = head
        head.next = None
        return new_node
```

<div id = "24" style="text-align: center;">
#24, Swap Nodes in Paris
</div>

```
給定一個鏈表，兩兩交換其中相鄰的節點，並返回交換後的鏈表。

你不能只是單純的改變節點內部的值，而是需要實际的進行節點交換。

示例：

head = [1,2,3,4]

output: [2,1,4,3]
```

RECURSION:

```python
class Solution:
    def swapPairs(self, head: Optional[ListNode]) ->Optional[ListNode]:
        if not head or not head.next:
            return head
        prev = head
        cur = head.next
        next = head.next.next
        cur.next = prev
        prev.next = self.swapPairs(next) # 將以next為head的後續
        return cur
```

Iterative:

```python
class Solution:
    def swapPairs(self, head: Optional[ListNode]) ->Optional[ListNode]:
    dummyHead = ListNode(0) # 設置一個虛擬頭結點面做刪除操作
    dummyHead.next = head # 將虛擬頭結點指向head，這樣方便後
    cur = dummyHead
    while cur.next and cur.next.next:
        tmp1 = cur.next # 記錄臨時節點
        tmp2 = cur.next.next.next # 記錄臨時節點

        cur.next = cur.next.next # 步骤一
        cur.next.next = tmp1 # 步骤二
        cur.next.next.next = tmp2 # 步骤三

        cur = cur.next.next # cur移動兩位，准備下一輪交換 return dummyHead.next
    return dummyHead.next
```
![描述文字](https://camo.githubusercontent.com/01651992af843c28fd7496e6a04cc4e83760a7ceead3d8da46e4c1acb35b02bc/68747470733a2f2f636f64652d7468696e6b696e672e63646e2e626365626f732e636f6d2f706963732f32342e254534254238254134254534254238254134254534254241254134254536253844254132254539253933254245254538254131254138254534254238254144254537253941253834254538253841253832254537253832254239312e706e67)

<div id = "19" style="text-align: center;">
#19, Remove Nth Node From End of List
</div>

```
給你一個鏈表，刪除鏈表的倒數第 n 個結點，並且返回鏈表的頭結點。

輸入：head = [1,2,3,4,5], n = 2 輸出：[1,2,3,5]


輸入：head = [1], n = 1 輸出：[]


輸入：head = [1,2], n = 1 輸出：[1]
```

雙指針的經典應用，如果要刪除倒數第n個節點，讓fast移動n步，然後讓fast和slow同時移動，直到fast指向鏈表末尾。刪掉slow所指向的節點就可以了。

思路是這樣的，但要注意一些細節。

1. 首先這裏我推薦大家使用虛擬頭結點，這樣方便處理刪除實际頭結點的邏輯。

2. 定義fast指針和slow指針，初始值為虛擬頭結點

3. fast首先走n + 1步 ，為什麼是n+1呢，因為只有這樣同時移動的時候slow才能指向刪除節點的上一個節點（方便做刪除操作

4. fast和slow同時移動，直到fast指向末尾(Null)

5. 刪除slow指向的下一個節點

```python
class Solution:
    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
        # Create a dummy node to handle edge cases gracefully
        dummy = ListNode(0)
        dummy.next = head
        
        fast = dummy
        slow = dummy
        
        # Move fast n+1 steps ahead to maintain the gap
        for _ in range(n + 1):
            fast = fast.next
        
        # Move both fast and slow until fast reaches the end
        while fast:
            fast = fast.next
            slow = slow.next
        
        # Remove the nth node from the end
        slow.next = slow.next.next
        
        return dummy.next
```

<div id = "160" style="text-align: center;">
#160, Intersection of Two Linked Lists
</div>

```
給你兩個單鏈表的頭節點 headA 和 headB ，請你找出並返回兩個單鏈表相交的起始節點。如果兩個鏈表沒有交點，返回 null 。
```

![](https://camo.githubusercontent.com/f5e894bff106380c6648d69ea08217bfe793eb925e37f36663db2903e84ec10e/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f32303231313231393232313732332e706e67)

簡單來說，就是求兩個鏈表交點節點的指針。 這裏同學們要注意，交點不是數值相等，而是指針相等。

為了方便舉例，假設節點元素數值相等，則節點指針相等。

看如下兩個鏈表，目前curA指向鏈表A的頭結點，curB指向鏈表B的頭結點：

![](https://camo.githubusercontent.com/c6d77070c788bb9aba8c74b7b3c1f649797a0cfe2843f1fe91050e208b642f07/68747470733a2f2f636f64652d7468696e6b696e672e63646e2e626365626f732e636f6d2f706963732f25453925394425413225453825414625393525453925413225393830322e30372e2545392539332542452545382541312541382545372539422542382545342542412541345f312e706e67)

我們求出兩個鏈表的长度，並求出兩個鏈表长度的差值，然後讓curA移動到，和curB 末尾對齐的位置，如圖：

![](https://camo.githubusercontent.com/f50f6cd03839a7f7f1d443129261f1fe36e297ae5381c1d2395e9d9c732c55d9/68747470733a2f2f636f64652d7468696e6b696e672e63646e2e626365626f732e636f6d2f706963732f25453925394425413225453825414625393525453925413225393830322e30372e2545392539332542452545382541312541382545372539422542382545342542412541345f322e706e67)

此時我們就可以比較curA和curB是否相同，如果不相同，同時向後移動curA和curB，如果遇到curA == curB，則找到交點。

```python
class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> ListNode:
        lenA, lenB = 0, 0
        cur = headA
        while cur:         # 求鏈表A的长度
            cur = cur.next 
            lenA += 1
        cur = headB 
        while cur:         # 求鏈表B的长度
            cur = cur.next 
            lenB += 1
        curA, curB = headA, headB
        if lenA < lenB:     # 讓curA為最长鏈表的頭，lenB為其长度
            curA, curB = curB, curA
            lenA, lenB = lenB, lenA 
        for _ in range(lenA - lenB):  # 讓curA和curB在同一起點上（末尾位置對齐）
            curA = curA.next 
        while curB:         #  遍曆curA 和 curB，遇到相同則直接返回
            if curA == curB:
                return curB
            else:
                curA = curA.next 
                curB = curB.next
        return None 
```


<div id = "142" style="text-align: center;">
#142, Linked List Cycle 2
</div>

```
题意： 給定一個鏈表，返回鏈表開始入環的第一個節點。 如果鏈表無環，則返回 null。
```

為了表示給定鏈表中的環，使用整數 pos 來表示鏈表尾連接到鏈表中的位置（索引從 0 開始）。 如果 pos 是 -1，則在該鏈表中沒有環。


![](https://camo.githubusercontent.com/b364f73596cb946f8cef38dcecf559f6abad44a5d45c5f2e58802abec84bd46a/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f32303232303932353130333433332e706e67)

那麼相遇時： slow指針走過的節點數為: x + y， fast指針走過的節點數： x + y + n (z + y)，n為fast指針在環內走了n圈才遇到slow指針， （y+z）為 一圈內節點的個數A。

因為fast指針是一步走兩個節點，slow指針一步走一個節點， 所以 fast指針走過的節點數 = slow指針走過的節點數 * 2：

(x + y) * 2 = x + y + n (y + z)

兩邊消掉一個（x+y）: x + y  = n (y + z) 

因為要找環形的入口，那麼要求的是x，因為x表示 頭結點到 環形入口節點的的距離。

所以要求x ，將x單獨放在左面：x = n (y + z) - y ,

這個公式說明什麼呢？

先拿n為1的情況來舉例，意味著fast指針在環形裏轉了一圈之後，就遇到了 slow指針了。

當 n為1的時候，公式就化解為 x = z，

這就意味著，從頭結點出發一個指針，從相遇節點 也出發一個指針，這兩個指針每次只走一個節點， 那麼當這兩個指針相遇的時候就是 環形入口的節點。

也就是在相遇節點處，定義一個指針index1，在頭結點處定一個指針index2。

讓index1和index2同時移動，每次移動一個節點， 那麼他們相遇的地方就是 環形入口的節點。

```python
class Solution:
    def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        slow = fast = head

        while fast and fast.next:
            fast = fast.next.next
            slow = slow.next
            if fast == slow:
                meet = fast
                init = head
                while init != meet:
                    init = init.next
                    meet = meet.next
                return meet 
        return None
```

## Hash Table:

一般哈希表都是用來快速判斷一個元素是否出現集合裏。要枚舉的話時间複雜度是O(n)，但如果使用哈希表的話， 只需要O(1)就可以做到。

哈希函數，把學生的姓名直接映射為哈希表上的索引，然後就可以通過查詢索引下標快速知道這位同學是否在這所學校裏了。

哈希函數，通過hashCode把名字轉化為數值，一般hashcode是通過特定編碼方式，可以將其他數據格式轉化為不同的數值，這樣就把學生名字映射為哈希表上的索引數字了。

哈希碰撞

set 的底層實現：

set 是一個無序的、唯一的集合。它的底層實現依賴於哈希表。當我們向 set 中插入一個元素時，Python 會根據該元素的哈希值將其存儲在一個哈希表中。

哈希表：set 使用哈希表來存儲元素。每個元素會計算一個哈希值，該哈希值用於確定元素在哈希表中的位置。
哈希函數：set 使用內置的 hash() 函數來計算元素的哈希值。
碰撞處理：當兩個元素的哈希值相同時（稱為哈希碰撞），set 使用開放尋址或鏈地址法等技術來處理碰撞。
元素存儲：由於哈希表的特性，set 中的元素是無序的。每個插入操作的時間複雜度平均為 O(1)。

dict 的底層實現：
dict 是一個鍵-值對映射。它的底層實現也是基於哈希表。

哈希表：dict 使用哈希表來存儲鍵-值對。每個鍵會計算一個哈希值，該哈希值用於確定鍵-值對在哈希表中的位置。
哈希函數：dict 使用內置的 hash() 函數來計算鍵的哈希值。
碰撞處理：與 set 一樣，dict 也需要處理哈希碰撞。Python 使用開放尋址法來處理這些碰撞。
元素存儲：鍵和值是成對存儲的。由於哈希表的特性，鍵的插入和查找操作的時間複雜度平均為 O(1)。



<div id = "242" style="text-align: center;">
#242, Valid Anagram
</div>

```
給定兩個字符串 s 和 t ，編寫一個函數來判斷 t 是否是 s 的字母異位詞。

示例 1: 輸入: s = "anagram", t = "nagaram" 輸出: true

示例 2: 輸入: s = "rat", t = "car" 輸出: false

說明: 你可以假設字符串只包含小寫字母。
```

```python
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        record = [0] * 26
        for i in s:
            #並不需要記住字符a的ASCII，只要求出一個相對數值就可以了
            record[ord(i) - ord("a")] += 1
        for i in t:
            record[ord(i) - ord("a")] -= 1
        for i in range(26):
            if record[i] != 0:
                #record數組如果有的元素不為零0，說明字符串s和t 一定是誰多了字符或者誰少了字符。
                return False
        return True
```

```python
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        count_s = {}
        count_t = {}
        
        for char in s:
            if char in count_s:
                count_s[char] += 1
            else:
                count_s[char] = 1
        
        for char in t:
            if char in count_t:
                count_t[char] += 1
            else:
                count_t[char] = 1
        return count_s == count_t
        
```


<div id = "1002" style="text-align: center;">
#1002, Find Common Characters
</div>

```
給你一個字符串數組 words ，請你找出所有在 words 的每個字符串中都出現的共用字符（ 包括重複字符），並以數組形式返回。你可以按 任意顺序 返回答案。

示例 1：

輸入：words = ["bella","label","roller"] 輸出：["e","l","l"]

示例 2：

輸入：words = ["cool","lock","cook"] 輸出：["c","o"]

提示：

1 <= words.length <= 100 1 <= words[i].length <= 100 words[i] 由小寫英文字母組成
```

![](https://camo.githubusercontent.com/005ce8412d380d9aa3ba005eafc914e90da50358dccc382740f81dafa9601160/68747470733a2f2f636f64652d7468696e6b696e672e63646e2e626365626f732e636f6d2f706963732f313030322e2545362539462541352545362538392542452545352542382542382545372539342541382545352541442539372545372541432541362e706e67)

```python
class Solution:
    def commonChars(self, words: List[str]) -> List[str]:
        if not words: 
            return []

        result = []
        hash = [0] * 26  # 用來統計所有字符串裏字符出現的最小频率
        
        # 用第一個字符串給hash初始化
        for c in words[0]:  
            hash[ord(c) - ord('a')] += 1
        
        # 統計除第一個字符串外字符的出現频率
        for i in range(1, len(words)):
            hashOtherStr = [0] * 26
            for j in range(len(words[i])):
                hashOtherStr[ord(words[i][j]) - ord('a')] += 1

            # 更新hash，保證hash裏統計26個字符在所有字符串裏出現的最小次數
            for k in range(26):
                hash[k] = min(hash[k], hashOtherStr[k])
        
        # 將hash統計的字符次數，轉成輸出形式
        for i in range(26):
            while hash[i] != 0:  # 注意這裏是while，多個重複的字符
                result.append(chr(i + ord('a')))
                hash[i] -= 1
        
        return result
```

時间複雜度：
𝑂
(
𝑊
⋅
𝐿
)
O(W⋅L)，其中 
𝑊
W 是字符串數組的长度，
𝐿
L 是字符串數組中最长字符串的长度。
空间複雜度：
𝑂
(
𝐿
)
O(L)，其中 
𝐿
L 是字符串數組中最长字符串的长度。

<div id = "349" style="text-align: center;">
#349, Intersection of Two Arrays
</div>

```
题意：給定兩個數組，編寫一個函數來計算它們的交集。you may return the result in any order.

Input: nums1 = [1,2,2,1], nums2 = [2,2]

Output: [2]

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]

Output: [9,4]

Explanation: [4,9] is also accepted.
```

```python
class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
    # 使用哈希表存儲一個數組中的所有元素
        table = {}
        for num in nums1:
            table[num] = table.get(num, 0) + 1
        
        # 使用集合存儲結果
        res = set()
        for num in nums2:
            if num in table:
                res.add(num)
                del table[num]
        
        return list(res)
```

**為什麼這一題要用兩種資料結構解題？**

哈希表的作用：

存儲 nums1 的元素：
我們使用哈希表 table 來存儲 nums1 中的所有元素，並記錄每個元素出現的次數。
使用哈希表的優點是查找和插入操作的平均時间複雜度都是 
𝑂
(
1
)
O(1)。
具體地，對於每個 nums1 中的元素，我們將其作為哈希表的鍵，並將其值初始化為1（即便多次出現也不影響，因為我們只關心是否存在）

集合的作用：

存儲交集結果：我們使用集合 res 來存儲交集結果。
使用集合的優點是它只存儲唯一元素，自動去重。

<div id = "202" style="text-align: center;">
#202, Happy Number
</div>

```
「快樂數」定義為：對於一個正整數，每一次將該數替換為它每個位置上的數字的平方和，然後重複這個過程直到這個數變為 1，也可能是 無限循環 但始終變不到 1。如果 可以變為  1，那麼這個數就是快樂數。

輸入：19

輸出：true

解釋：

1^2 + 9^2 = 82

8^2 + 2^2 = 68

6^2 + 8^2 = 100

1^2 + 0^2 + 0^2 = 1
```

這道题目看上去貌似一道數學问题，其實並不是！

题目中說了會 無限循環，那麼也就是說求和的過程中，sum會重複出現，這對解题很重要！當我們遇到了要快速判斷一個元素是否出現集合裏的時候，就要考慮哈希法了。

```python
class Solution:
    def isHappy(self, n: int) -> bool:
        seen = set()
        
        while n != 1 and n not in seen:
            seen.add(n)
            sum_of_squares = 0
            for char in str(n):
                digit = int(char)
                sum_of_squares += digit ** 2
            n = sum_of_squares
        
        return n == 1
```

<div id = "1" style="text-align: center;">
#1, Two Sum
</div>

*map 在python 中稱為dict*

```
給定一個整數數組 nums 和一個目標值 target，請你在該數組中找出和為目標值的那 兩個 整數，並返回他們的數組下標。

你可以假設每種輸入只會對應一個答案。但是，數組中同一個元素不能使用兩遍。

示例:

給定 nums = [2, 7, 11, 15], target = 9

因為 nums[0] + nums[1] = 2 + 7 = 9

所以返回 [0, 1]
```

本题其實有四個重點：

1. 為什麼會想到用哈希表
2. 哈希表為什麼用map
3. 本题map是用來存什麼的
4. map中的key和value用來存什麼的

首先我再強調一下 什麼時候使用哈希法，當我們需要查詢一個元素是否出現過，或者一個元素是否在集合裏的時候，就要第一時间想到哈希法。

本题呢，我就需要一個集合來存放我們遍曆過的元素，然後在遍曆數組的時候去詢问這個集合，某元素是否遍曆過，也就是 是否出現在這個集合。

那麼我們就應該想到使用哈希法了。

因為本题，我們不僅要知道元素有沒有遍曆過，還要知道這個元素對應的下標，需要使用 key value結構來存放，key來存元素，value來存下標，那麼使用map正合適。

再來看一下使用數組和set來做哈希法的局限。

數組的大小是受限制的，而且如果元素很少，而哈希值太大會造成內存空间的浪費。

set是一個集合，裏面放的元素只能是一個key，而兩數之和這道题目，不僅要判斷y是否存在而且還要記錄y的下標位置，因為要返回x 和 y的下標。所以set 也不能用。

此時就要選擇另一種數據結構：map ，map是一種key value的存儲結構，可以用key保存數值，用value再保存數值所在的下標。

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        
        Haveseen = {}  # 初始化一個空的哈希表
        
        for i, value in enumerate(nums):  # 枚舉nums數組，i是索引，value是對應的元素
            if target - value in Haveseen:  # 檢查當前元素的補數是否在哈希表中
                return [Haveseen[target - value], i]  # 如果找到了補數，返回補數的索引和當前索引
            else:
                Haveseen[value] = i  # 如果沒有找到補數，把當前元素存入哈希表，鍵是元素值，值是索引
```

**enumerate() 函數用於將一個可遍曆的數據對象(如列表、元組或字符串)組合為一個索引序列，同時列出數據和數據下標，一般用在for 循環當中。**

當然也可以先把題幹做排序，用雙指針（但是會由O(n)變成O(nlogn)）

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # 對輸入列表進行排序
        nums_sorted = sorted(nums)
        
        # 使用雙指針
        left = 0
        right = len(nums_sorted) - 1
        while left < right:
            current_sum = nums_sorted[left] + nums_sorted[right]
            if current_sum == target:
                # 如果和等於目標數，則返回兩個數的下標
                left_index = nums.index(nums_sorted[left])
                right_index = nums.index(nums_sorted[right])
                if left_index == right_index:
                    right_index = nums[left_index+1:].index(nums_sorted[right]) + left_index + 1
                return [left_index, right_index]
            elif current_sum < target:
                # 如果總和小於目標，則將左側指針向右移動
                left += 1
            else:
                # 如果總和大於目標值，則將右指針向左移動
                right -= 1
```



![](https://camo.githubusercontent.com/7c9fdc5c90edbd8498ac963e8ca830cdd848921ef303d84dbdcf2092cf39e1cb/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f32303232303731313230323633382e706e67)

<div id = "454" style="text-align: center;">
#454, 4 Sum 2
</div>

```
給定四個包含整數的數組列表 A , B , C , D ,計算有多少個元組 (i, j, k, l) ，使得 A[i] + B[j] + C[k] + D[l] = 0。

為了使问题簡單化，所有的 A, B, C, D 具有相同的长度 N，且 0 ≤ N ≤ 500 。所有整數的范圍在 -2^28 到 2^28 - 1 之间，最終結果不會超過 2^31 - 1 。

例如:

輸入:

A = [ 1, 2]
B = [-2,-1]
C = [-1, 2]
D = [ 0, 2]

輸出:

2

解釋:

兩個元組如下:

(0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0

(1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0
```

本题乍眼一看好像和0015.三數之和，0018.四數之和差不多，其實差很多。

本题是使用哈希法的經典题目，而0015.三數之和，0018.四數之和並不合適使用哈希法，因為三數之和和四數之和這兩道题目使用哈希法在不超時的情況下做到對結果去重是很困难的，很有多細節需要處理。

而這道题目是四個獨立的數組，只要找到A[i] + B[j] + C[k] + D[l] = 0就可以，不用考慮有重複的四個元素相加等於0的情況，所以相對於题目18. 四數之和，题目15.三數之和，還是簡單了不少！

```python
class Solution(object):
    def fourSumCount(self, nums1, nums2, nums3, nums4):
        # 使用字典存儲nums1和nums2中的元素及其和
        hashmap = {}
        for n1 in nums1:
            for n2 in nums2:
                hashmap[n1+n2] = hashmap.get(n1+n2, 0) + 1
        
        # 如果 -(n1+n2) 存在於nums3和nums4, 存入結果, 
        # 試想，當hashmap裡面已經有2了，這時候n3+n4出現一個 -2, 只要將-2變為2（取負數），如果存在在hashmap中，就知道他們相加==0。
        count = 0
        for n3 in nums3:
            for n4 in nums4:
                key = - n3 - n4
                if key in hashmap:
                    count += hashmap[key]
        return count
```

時间複雜度: O(n^2)

空间複雜度: O(n^2)


<div id = "383"style="text-align: center;">
#383, Ransom Note
</div>

```
給定一個贖金信 (ransom) 字符串和一個雜志(magazine)字符串，**判斷第一個字符串 ransom 能不能由第二個字符串 magazines 裏面的字符構成。如果可以構成，返回 true ；否則返回 false。**

(题目說明：為了不暴露贖金信字跡，要從雜志上搜索各個需要的字母，組成單詞來表達意思。雜志字符串中的每個字符只能在贖金信字符串中使用一次。)

注意：

你可以假設兩個字符串均只含有小寫字母。

canConstruct("a", "b") -> false

canConstruct("aa", "ab") -> false

canConstruct("aa", "aab") -> true
```

```python
class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:
        ransom_count = [0] * 26
        magazine_count = [0] * 26
        for c in ransomNote:
            ransom_count[ord(c) - ord('a')] += 1
        for c in magazine:
            magazine_count[ord(c) - ord('a')] += 1
        return all(ransom_count[i] <= magazine_count[i] for i in range(26))
```

**all 函數會對生成器表達式中的每個元素進行求值，只要所有元素都為 True，它就返回 True，否則返回 False。**

**生成器表達式 ransom_count[i] <= magazine_count[i] for i in range(26) 會遍曆從 0 到 25 的所有索引（對應字母 a 到 z），並檢查 ransom_count 中每個索引 i 的值是否小於或等於 magazine_count 中對應的值**

```python
class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:
        counts = {}
        for char in magazine:
            counts[char] = counts.get(char,0) + 1
        
        for char in ransomNote:
            if char in counts and counts[char] > 0:
                counts[char] -= 1
        
            else:
                return False
        return True
```

<div id = "15" style="text-align: center;">
#15, 3Sum
</div>

```
給你一個包含 n 個整數的陣列 nums，判斷 nums 中是否存在三個元素 a，b，c ，使得 a + b + c = 0 ？請你找出所有符合條件且不重複的三元組。

注意： 答案中不可以包含重複的三元組。

示例：

給定數組 nums = [-1, 0, 1, 2, -1, -4]，

滿足要求的三元組集合：[ [-1, 0, 1], [-1, -1, 2] ]
```

*hash 解法：*

兩層for迴圈就可以確定a 和b 的數值了，可以用哈希法來確定0-(a+b) 是否在數組裡出現過，其實這個思路是正確的，但是我們有一個非常棘手的問題，就是題目中說的不可以包含重複的三元組。

把符合條件的三元組放進vector中，然後再去重，這樣是非常費時的，很容易超時，也是這道題目通過率如此之低的根源所在。O(n^2)

```python
from typing import List

class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        result = []
        nums.sort()
        # 找出a + b + c = 0
        # a = nums[i], b = nums[j], c = -(a + b)
        for i in range(len(nums)):
            # 排序之後如果第一個元素已經大於零，不可能湊成三元組
            if nums[i] > 0:
                break
            if i > 0 and nums[i] == nums[i - 1]:  # 三元組元素a去重
                continue
            s = set()
            for j in range(i + 1, len(nums)):
                if j > i + 2 and nums[j] == nums[j - 1] and nums[j - 1] == nums[j - 2]:  # 三元組元素b去重
                    continue
                c = - (nums[i] + nums[j])
                if c in s:
                    result.append([nums[i], nums[j], c])
                    s.remove(c)  # 三元組元素c去重
                else:
                    s.add(nums[j])
        return result

```

*雙指針*

![](https://camo.githubusercontent.com/a6e56f0cd5661cc020cd6609522309707357b7a9c31a57a7436b264d276516be/68747470733a2f2f636f64652d7468696e6b696e672e63646e2e626365626f732e636f6d2f676966732f31352e2545342542382538392545362539352542302545342542392538422545352539322538432e676966
)

拿這個nums數組來舉例，先將數組排序，然後有一層for循環，i從下標0的地方開始，同時定一個下標left 定義在i+1的位置上，定義下標right 在數組結尾的位置上。

還是在陣列中找到 abc 使得a + b +c =0，我們在這裡相當於 a = nums[i]，b = nums[left]，c = nums[right]。

接下來要如何移動left 和right呢， 如果nums[i] + nums[left] + nums[right] > 0 就表示此時三數總和大了，因為數組是排序後了，所以right下標就應該向左移動，這樣才能讓三數總和小一點。

如果 nums[i] + nums[left] + nums[right] < 0 說明 此時 三數之和小了，left 就向右移動，才能讓三數總和大一些，直到left與right相遇為止。

時間複雜度：O(n^2)。

```python
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        result = []
        nums.sort()
        
        for i in range(len(nums)):
            # 如果第一個元素已經大於0，不需要進一步檢查
            if nums[i] > 0:
                return result
            
            # 跳過相同的元素以避免重複
            if i > 0 and nums[i] == nums[i - 1]:
                continue
                
            left = i + 1
            right = len(nums) - 1
            
            while right > left:
                sum_ = nums[i] + nums[left] + nums[right]
                
                if sum_ < 0:
                    left += 1
                elif sum_ > 0:
                    right -= 1
                else:
                    result.append([nums[i], nums[left], nums[right]])
                    
                    # 跳過相同的元素以避免重複
                    while right > left and nums[right] == nums[right - 1]:
                        right -= 1
                    while right > left and nums[left] == nums[left + 1]:
                        left += 1
                        
                    right -= 1
                    left += 1
                    
        return result
```

<div id = "18" style="text-align: center;">
#18, 4 sum
</div>

```
题意：給定一個包含 n 個整數的數組 nums 和一個目標值 target，判斷 nums 中是否存在四個元素 a，b，c 和 d ，使得 a + b + c + d 的值與 target 相等？找出所有滿足條件且不重複的四元組。

注意：

答案中不可以包含重複的四元組。

示例： 給定數組 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。 
滿足要求的四元組集合為： [ [-1, 0, 0, 1], [-2, -1, 1, 2], [-2, 0, 0, 2] ]
```

四數之和，和15.三數之和是一個思路，都是使用雙指針法, 基本解法就是在15.三數之和 的基礎上再套一層for循環。

但是有一些細節需要注意，例如： 不要判斷nums[k] > target 就返回了，三數之和 可以通過 nums[i] > 0 就返回了，因為 0 已經是確定的數了，四數之和這道题目 target是任意值。比如：數組是[-4, -3, -2, -1]，target是-10，不能因為-4 > -10而跳過。但是我們依舊可以去做剪枝，邏輯變成nums[i] > target && (nums[i] >=0 || target >= 0)就可以了。

四數之和的雙指針解法是兩層for循環nums[k] + nums[i]為確定值，依然是循環內有left和right下標作為雙指針，找出nums[k] + nums[i] + nums[left] + nums[right] == target的情況，三數之和的時间複雜度是O(n^2)，四數之和的時间複雜度是O(n^3) 。

那麼一樣的道理，五數之和、六數之和等等都采用這種解法。

對於15.三數之和雙指針法就是將原本暴力O(n^3)的解法，降為O(n^2)的解法，四數之和的雙指針解法就是將原本暴力O(n^4)的解法，降為O(n^3)的解法。

之前我們講過哈希表的經典题目：454.四數相加II，相對於本题簡單很多，因為本题是要求在一個集合中找出四個數相加等於target，同時四元組不能重複。

雙指針法將時间複雜度：O(n^2)的解法優化為 O(n)的解法。也就是降一個數量級，题目如下：

1. 27.移除元素
2. 15.三數之和
3. 18.四數之和

```python
def four_sum(nums, target):
    nums.sort()  # 對數組進行排序
    result = []
    n = len(nums)
    
    for i in range(n - 3):
        # 去重
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        for j in range(i + 1, n - 2):
            # 去重
            if j > i + 1 and nums[j] == nums[j - 1]:
                continue
            left, right = j + 1, n - 1
            while left < right:
                total = nums[i] + nums[j] + nums[left] + nums[right]
                if total == target:
                    result.append([nums[i], nums[j], nums[left], nums[right]])
                    # 跳過重複元素
                    while left < right and nums[left] == nums[left + 1]:
                        left += 1
                    while left < right and nums[right] == nums[right - 1]:
                        right -= 1
                    left += 1
                    right -= 1
                elif total < target:
                    left += 1
                else:
                    right -= 1
    return result

```

四指針法（雙指針法）：

排序：時间複雜度是 
𝑂
(
𝑛
log
⁡
𝑛
)


四重循環：第一層循環是 
𝑂
(
𝑛
)
，第二層循環是 
𝑂
(
𝑛
)
，內層雙指針循環的複雜度是 
𝑂
(
𝑛
)


總時間複雜度為：O(nlogn+n ^
3
 )=O(n ^
3
 )。

*hash table:*

四數之和问题的算法實現中使用的四指針法（實际上是兩層循環加雙指針法）是比較高效的方法之一，但它的時间複雜度是 
𝑂
(
𝑛
3
)
O(n 
3
 )，這並不是最快的理論時间複雜度，但是對於實际應用來說，這個算法的性能通常是足夠的。

對於此類问题，最理想的時间複雜度可能是 
𝑂
(
𝑛
2
log
⁡
𝑛
)
O(n 
2
 logn) 或 
𝑂
(
𝑛
2
)
O(n 
2
 )，通過使用哈希表來進一步優化查找過程。但是，這樣的優化往往在實际實現中會遇到諸如管理和維護複雜的數據結構、處理更複雜的去重邏輯等挑戰。

 ```python
 def four_sum_hash(nums, target):
    from collections import defaultdict
    num_dict = defaultdict(list)
    results = set()
    nums.sort()
    n = len(nums)
    
    # 存儲所有可能的兩數和
    for i in range(n):
        for j in range(i + 1, n):
            num_dict[nums[i] + nums[j]].append((i, j))
    
    # 查找四個不同索引的元素，其和為 target
    for key in num_dict:
        complement = target - key
        if complement in num_dict:
            for first_pair in num_dict[key]:
                for second_pair in num_dict[complement]:
                    index_set = set(first_pair + second_pair)
                    # 確保四個索引不重複
                    if len(index_set) == 4:
                        quad = sorted(nums[i] for i in index_set)
                        results.add(tuple(quad))
    
    return [list(quad) for quad in results]

 ```

 ## 字符串


<div id = "344" style="text-align: center;">
#344, reverse stirng
</div>

```
編寫一個函數，其作用是將輸入的字符串反轉過來。輸入字符串以字符數組 char[] 的形式給出。

不要給另外的數組分配额外的空间，你必须原地修改輸入數組、使用 O(1) 的额外空间解決這一问题。

你可以假設數組中的所有字符都是 ASCII 碼表中的可打印字符。

示例 1：
輸入：["h","e","l","l","o"]
輸出：["o","l","l","e","h"]

示例 2：
輸入：["H","a","n","n","a","h"]
輸出：["h","a","n","n","a","H"]
```

two pointers:
```python
class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        left, right = 0, len(s) - 1
        
        # 該方法已經不需要判斷奇偶數，經測試後時间空间複雜度比用 for i in range(len(s)//2)更低
        # 因為while每次循環需要進行條件判斷，而range函數不需要，直接生成數字，因此時间複雜度更低。推薦使用range
        while left < right:
            s[left], s[right] = s[right], s[left]
            left += 1
            right -= 1
```
stack:
```python
class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        stack = []
        for char in s:
            stack.append(char)
        for i in range(len(s)):
            s[i] = stack.pop()
       
```

reversed:
```python
class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        s[:] = reversed(s)
       
```
reverse():
```python
class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        # 原地反轉,無返回值
        s.reverse()
       
```
for:
```python
class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        n = len(s)
        for i in range(n // 2):
            s[i], s[n - i - 1] = s[n - i - 1], s[i]
       
```

slice:
```python
class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        s[:] = s[::-1]
       
```

<div id = "541" style="text-align: center;">
#541, reverse stirng 2
</div>

```
給定一個字符串 s 和一個整數 k，從字符串開頭算起, 每計數至 2k 個字符，就反轉這 2k 個字符中的前 k 個字符。

如果剩餘字符少於 k 個，則將剩餘字符全部反轉。

如果剩餘字符小於 2k 但大於或等於 k 個，則反轉前 k 個字符，其餘字符保持原樣。

示例:

輸入: s = "abcdefg", k = 2
輸出: "bacdfeg"
```
從字符串的開頭開始，每次處理 2k 個字符。
對於每個 2k 的塊，反轉前 k 個字符。
處理剩餘字符時，如果少於 k 個，則全部反轉；如果在 k 和 2k 之间，則反轉前 k 個字符，其餘保持原樣。

```python
def reverse_str(s, k):
    s = list(s)  # 將字符串轉為列表，方便操作
    for i in range(0, len(s), 2 * k):
        s[i:i+k] = reversed(s[i:i+k])  # 反轉前 k 個字符
    return ''.join(s)  # 將列表轉回字符串

# 示例使用
s = "abcdefg"
k = 2
print(reverse_str(s, k))  # 輸出: "bacdfeg"

```

手動：

```python
def reverse_str(s, k):
    # 將字符串轉換為列表以便修改
    s = list(s)
    n = len(s)
    
    for i in range(0, n, 2 * k):
        # 找到當前需要反轉的部分
        left = i
        right = min(i + k - 1, n - 1)
        
        # 手動反轉這一部分
        while left < right:
            s[left], s[right] = s[right], s[left]
            left += 1
            right -= 1
    
    # 將列表轉換回字符串
    result = ""
    for char in s:
        result += char
    
    return result
```

<div id = "151" style="text-align: center;">
#151, Reverse Words in a String
</div>

```python
給定一個字符串，逐個翻轉字符串中的每個單詞。

示例 1：
輸入: "the sky is blue"
輸出: "blue is sky the"

示例 2：
輸入: "  hello world!  "
輸出: "world! hello"
解釋: 輸入字符串可以在前面或者後面包含多餘的空格，但是反轉後的字符不能包括。

示例 3：
輸入: "a good   example"
輸出: "example good a"
解釋: 如果兩個單詞间有多餘的空格，將反轉後單詞间的空格減少到只含一個。
```

這道题目可以說是綜合考察了字符串的多種操作。

一些同學會使用split庫函數，分隔單詞，然後定義一個新的string字符串，最後再把單詞倒序相加，那麼這道题题目就是一道水题了，失去了它的意義。

```python
def reverse_words(s):
    # 將字符串拆分成單詞列表，同時去除多餘空格
    words = s.split()
    
    # 反轉整個單詞列表
    words.reverse()
    
    # 將單詞列表重新拼接成字符串
    result = ' '.join(words)
    
    return result
```
所以這裏我還是提高一下本题的难度：不要使用輔助空间，空间複雜度要求為O(1)。（如果使用python可以為O(n), 因為字符串要改成列表）

不能使用輔助空间之後，那麼只能在原字符串上下功夫了。

想一下，我們將整個字符串都反轉過來，那麼單詞的顺序指定是倒序了，只不過單詞本身也倒序了，那麼再把單詞反轉一下，單詞不就正過來了。


所以解题思路如下：

移除多餘空格
將整個字符串反轉
將每個單詞反轉
舉個例子，源字符串為："the sky is blue "

移除多餘空格 : "the sky is blue"
字符串反轉："eulb si yks eht"
單詞反轉："blue is sky the"

```python
class Solution:
    def reverseWords(self, s: str) -> str:
        s = s.strip()  # 去除字符串頭尾兩端的空格
        words = []
        i = 0 
        n = len(s)

        # 將字串逐一加到words中
        while i < n:
            if s[i] != ' ':
                j = i
                while j < n and s[j] != ' ':
                    j += 1
                words.append(s[i:j])
                i = j
            else: 
                i += 1

        words.reverse()
        
        return ' '.join(words)
```

<div id = "28" style="text-align: center;">
#28, Find the Index of the First Occurrence in a String
</div>

```python
給定一個 haystack 字符串和一個 needle 字符串，在 haystack 字符串中找出 needle 字符串出現的第一個位置 (從0開始)。如果不存在，則返回  -1。

示例 1: 輸入: haystack = "hello", needle = "ll" 輸出: 2

示例 2: 輸入: haystack = "aaaaa", needle = "bba" 輸出: -1

說明: 當 needle 是空字符串時，我們應當返回什麼值呢？這是一個在面試中很好的问题。 對於本题而言，當 needle 是空字符串時我們應當返回 0 。這與C語言的 strstr() 以及 Java的 indexOf() 定義相符。
```

**KMP :**

KMP的經典思想就是:當出現字符串不匹配時，可以記錄一部分之前已經匹配的文本內容，利用這些信息避免從頭再去做匹配。

本篇講到了KMP的重要觀念，由於內容較多我建議大家去看卡爾的KMP解說影片。

- [KMP](https://www.bilibili.com/video/BV1PD4y1o7nd/)
- [KMP2](https://www.bilibili.com/video/BV1M5411j7Xx/)


KMP經典問題：

```
給一個文本串與一組模式串：試問模式串是否出現在文本串中？

文本串： aabaabaaf

模式串： aabaaf
```

暴力解的話就是兩層for, O(m*n), 解法是模式串逐個與文本串匹配。直到與文本串後段的aabaaf完全匹配。

KMP解法是要:

1. 先找到模式串的前後綴，

前綴：不包含尾字母的所有字串（aabaa, abaa, baa, aa, a）。

後綴：不包含首字母的所有字串 (abaaf, baaf, aaf, af, f)。

2. 求模式串最長相的前後綴(LPS), next數組：010120

a : 0

aa: 1

aab: 0

**a**ab**a**: 1

aabaa: 2

aabaaf : 0

3. 與文本串匹配：

當找到aabaa為最長相等前後綴時，2代表字串後綴的aa有一個前綴也是aa。

我們要找這個前綴的後面一位開始匹配。也就是b，他的下標剛好會是 2 。O(n + m)


![](https://camo.githubusercontent.com/a6e139d79995aaafa70abbc80a9e6708051d104b57675b81338a4b4c56a7b7b5/68747470733a2f2f636f64652d7468696e6b696e672e63646e2e626365626f732e636f6d2f676966732f4b4d50254537254232254245254538254145254232312e676966)

代碼四步驟：
1. 初始化
2. 前後綴不相同
3. 前後綴相同
4. 更新next

i ＝ 後綴末尾

j = 前綴末尾

dive into this first to know how to get your next array:
```python
def getNext(self, next: List[int], s: str) -> None:
        j = 0
        next[0] = 0
        for i in range(1, len(s)):
            while j > 0 and s[i] != s[j]:
                j = next[j - 1]
            if s[i] == s[j]:
                j += 1
            next[i] = j


```

answer: 

```python
class Solution:
    def getNext(self, next: List[int], s: str) -> None:
        j = 0
        next[0] = 0
        for i in range(1, len(s)):
            while j > 0 and s[i] != s[j]:
                j = next[j - 1]
            if s[i] == s[j]:
                j += 1
            next[i] = j
    
    def strStr(self, haystack: str, needle: str) -> int:
        if len(needle) == 0:
            return 0
        next = [0] * len(needle)
        self.getNext(next, needle)
        j = 0
        for i in range(len(haystack)):
            while j > 0 and haystack[i] != needle[j]:
                j = next[j - 1]
            if haystack[i] == needle[j]:
                j += 1
            if j == len(needle):
                return i - len(needle) + 1
        return -1
```

<div id = "459" style="text-align: center;">
#459, Repeated Substring Pattern
</div>

```ptyhon
給定一個非空的字符串，判斷它是否可以由它的一個子串重覆多次構成。給定的字符串只含有小寫英文字母，並且長度不超過10000。

示例 1:

輸入: "abab"
輸出: True
解釋: 可由子字符串 "ab" 重覆兩次構成。
示例 2:

輸入: "aba"
輸出: False
示例 3:

輸入: "abcabcabcabc"
輸出: True
解釋: 可由子字符串 "abc" 重覆四次構成。 (或者子字符串 "abcabc" 重覆兩次構成。)
```

**在一個串中查找是否出現過另一個串，這是KMP的看家本領**

先說結論：如果字符串是由重複子串組成的，重複子串的最小單位就是最長相等前後綴所不包含的那一部分。

如果 len( s ) % ( len( s ) - next [ size-1 ] ) == 0

原字符串如果能整除最長相等前後綴不包括的那一部分，代表他要retrun true

next[size-1] = 最長相等前後綴 ，所以len(s) - next[size-1]就是不包括的那一部分（最小單位重複子串）
```python
class Solution:
    def repeatedSubstringPattern(self, s: str) -> bool:  
        if len(s) == 0:
            return False
        nxt = [0] * len(s)
        self.getNext(nxt, s)
        if nxt[-1] != 0 and len(s) % (len(s) - nxt[-1]) == 0: #如果 nxt[-1] 等于 0，表示没有这样的前后缀匹配，这意味着字符串不可能由一个重复的子串构成
            return True
        return False
    
    def getNext(self, nxt, s):
        nxt[0] = 0
        j = 0
        for i in range(1, len(s)):
            while j > 0 and s[i] != s[j]:
                j = nxt[j - 1]
            if s[i] == s[j]:
                j += 1
            nxt[i] = j
        return nxt
```
**補充：**

nxt[-1]: 在Python中，nxt[-1]表示nxt數組的最後一個元素。這個值表示整個字符串中最長相等前後綴的長度

計算 nxt 數組的時間覆雜度是 O(n)，其中 n 是字符串 s 的長度。這是因為我們只需要遍歷字符串一次來填充 nxt 數組。

nxt 數組的長度為 n，所以空間覆雜度是 O(n)。

## 棧與隊列:

1. 棧（Stack）的實現

Python 中沒有專門的棧類，但我們可以通過 list 來實現棧的功能。

底層實現：list 底層是動態數組（dynamic array），它提供了在末尾添加和刪除元素的高效操作。

操作方法：

append()：在棧頂添加元素。
pop()：從棧頂移除元素。

2. 隊列（Queue）的實現

Python 提供了 collections.deque 來實現隊列的功能，deque 是雙端隊列（double-ended queue）的縮寫，可以高效地從兩端插入和刪除元素。

底層實現：deque 是通過雙向鏈表（doubly linked list）實現的，因此從隊列的兩端添加或移除元素都能達到 O(1) 的時間覆雜度。

操作方法：

append()：在隊列尾部添加元素。
appendleft()：在隊列頭部添加元素。
pop()：從隊列尾部移除元素。
popleft()：從隊列頭部移除元素。

**python內置的 len() 通常在創建對象時就已經知道長度，調用時直接返回長度值，時間覆雜度為 O(1)。但是如果自既定義一個mylen()，時間複雜度為O(n)**

那為什麼len()可以直接知道數組長度？

當你創建一個列表、字符串、字典等容器對象時，Python 會在內存中為該對象分配空間，並且在對象的內部結構中，存儲著該對象當前元素數量的信息。這個長度屬性是在元素被添加或移除時自動更新的。因此，當你調用 len() 函數時，它實際上是在讀取這個預先計算好的長度屬性，而不需要遍歷整個數據結構來計算長度。

<div id = "232" style="text-align: center;">
#232, Implement Queue using Stacks
</div>

```
使用棧實現隊列的下列操作：

push(x) -- 將一個元素放入隊列的尾部。
pop() -- 從隊列首部移除元素。
peek() -- 返回隊列首部的元素。
empty() -- 返回隊列是否為空。

示例:

MyQueue queue = new MyQueue();
queue.push(1);
queue.push(2);
queue.peek();  // 返回 1
queue.pop();   // 返回 1
queue.empty(); // 返回 false
```
使用stack來模式隊列的行為，如果僅僅用一個stack，是一定不行的，所以需要兩個stack一個input stack，一個output stack，這里要注意輸入棧和輸出棧的關系。

![](https://camo.githubusercontent.com/5753e936e2ddcd40e83a22375d5ede1c6346d203096fa1b9a326d0a1d0eb2106/68747470733a2f2f636f64652d7468696e6b696e672e63646e2e626365626f732e636f6d2f676966732f3233322e254537253934254138254536254130253838254535254145253945254537253845254230254539253938253946254535253838253937254537253839253838254536253943254143322e676966)

时间复杂度: push和empty为O(1), pop和peek为O(n)
空间复杂度: O(n)

在push數據的時候，只要數據放進輸入棧就好，但在pop的時候，操作就覆雜一些，輸出棧如果為空，就把進棧數據全部導入進來（注意是全部導入），再從出棧彈出數據，如果輸出棧不為空，則直接從出棧彈出數據就可以了。

最後如何判斷隊列為空呢？如果進棧和出棧都為空的話，說明模擬的隊列為空了。

```python

class MyQueue:

    def __init__(self):
        self.stack_in = []
        self.stack_out = []


    def push(self, x: int) -> None:
        self.stack_in.append(x)


    def pop(self) -> int:
        if self.empty():
            return None
        
        if self.stack_out:
            return self.stack_out.pop()
        else:
            for i in range(len(self.stack_in)):
                self.stack_out.append(self.stack_in.pop())
            return self.stack_out.pop()


    def peek(self) -> int:
        ans = self.pop()
        self.stack_out.append(ans)
        return ans


    def empty(self) -> bool:
        return not (self.stack_in or self.stack_out)
```

<div id = "225" style="text-align: center;">
#225, Implement Stack using Queues
</div>

```
使用队列实现栈的下列操作：

push(x) -- 元素 x 入栈
pop() -- 移除栈顶元素
top() -- 获取栈顶元素
empty() -- 返回栈是否为空

```

隊列模擬棧，其實一個隊列就夠了，那麽我們先說一說兩個隊列來實現棧的思路。

隊列是先進先出的規則，把一個隊列中的數據導入另一個隊列中，數據的順序並沒有變，並沒有變成先進後出的順序。

但是依然堅持要用兩個隊列來模擬棧，只不過沒有輸入和輸出的關系，而是另一個隊列完全用來備份的！

如下面動畫所示，用兩個隊列que1和que2實現隊列的功能，que2其實完全就是一個備份的作用，把que1最後面的元素以外的元素都備份到que2，然後彈出最後面的元素，再把其他元素從que2導回que1。

时间复杂度: pop为O(n)，其他为O(1)
空间复杂度: O(n)

![](https://camo.githubusercontent.com/49383d8478bdae7bc98c17861619d70e6341595199ade4d8e624daf4278fa2c1/68747470733a2f2f636f64652d7468696e6b696e672e63646e2e626365626f732e636f6d2f676966732f3232352e2545372539342541382545392539382539462545352538382539372545352541452539452545372538452542302545362541302538382e676966)

```python

from collections import deque

class MyStack:
    def __init__(self):
        self.queue1 = deque()  # 主隊列
        self.queue2 = deque()  # 輔助隊列

    def push(self, x: int) -> None:
        # 將元素入隊到 queue2
        self.queue2.append(x)
        # 再將 queue1 中的所有元素依次出隊並入隊到 queue2
        while self.queue1:
            self.queue2.append(self.queue1.popleft())
        # 交換 queue1 和 queue2 的引用
        self.queue1, self.queue2 = self.queue2, self.queue1

    def pop(self) -> int:
        # 直接從 queue1 中出隊即為出棧
        return self.queue1.popleft()

    def top(self) -> int:
        # 直接獲取 queue1 的第一個元素即為棧頂元素
        return self.queue1[0]

    def empty(self) -> bool:
        # 判斷 queue1 是否為空
        return not self.queue1


```

其實這道題目就是用一個隊列就夠了。

一個隊列在模擬棧彈出元素的時候只要將隊列頭部的元素（除了最後一個元素外） 重新添加到隊列尾部，此時再去彈出元素就是棧的順序了。

```python
from collections import deque

class MyStack:
    def __init__(self):
        self.queue = deque()

    def push(self, x: int) -> None:
        # 先將新元素加入隊列尾部
        self.queue.append(x)
        # 然後將隊列中的其他元素依次重新加入隊列尾部
        # 這樣新元素會被放到隊列的開頭
        for _ in range(len(self.queue) - 1):
            self.queue.append(self.queue.popleft())

    def pop(self) -> int:
        # 隊列頭部元素出隊，即棧頂元素出棧
        return self.queue.popleft()

    def top(self) -> int:
        # 隊列頭部元素即為棧頂元素
        return self.queue[0]

    def empty(self) -> bool:
        # 判斷隊列是否為空
        return not self.queue


```

push(x): 時間覆雜度為 O(n)，因為每次需要調整隊列中的所有元素以保證棧的順序。

pop(): 時間覆雜度為 O(1)，因為只需移除隊列頭部元素。

top(): 時間覆雜度為 O(1)，因為只需訪問隊列頭部元素。

empty(): 時間覆雜度為 O(1)，因為只需判斷隊列是否為空。



**To be continued...**