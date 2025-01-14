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

stack and queue:
1. [232 - Implement Queue using Stacks](#232)
2. [225 - Implement Stack using Queues](#225)
3. [20 - Valid Parentheses](#20)
4. [1047 - Remove All Adjacent Duplicates In String](#1047)
5. [150 - Evaluate Reverse Polish Notation](#150)
6. [239 - Sliding Window Maximum](#239)
7. [347, Sliding Window Maximum](#347)

binary tree:
1. [102 - Binary Tree Level Order Traversal](#102)
2. [226 - Invert binary Tree](#226)
3. [101 - Symmetric Tree](#101)
4. [104 - Maximum Depth of Binary Tree](#104)
5. [111 - Minimum Depth of Binary Tree](#111)
6. [222 - Count Complete Tree Nodes](#222)
7. [110 - Balanced Binary Tree](#110)
8. [257 - Binary Tree Paths](#257)
9. [404 - Sum of Left Leaves](#404)
10. [513 - Find Bottom Left Tree Value](#513)
11. [112 - Path Sum](#112)
12. [106 - Construct Binary Tree from Inorder and Postorder Traversal](#106)
13. [654 - Maximum Binary Tree](#654)
14. [617 - Merge Two Binary Trees](#617)


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


<div id = "20" style="text-align: center;">
#20, Valid Parentheses
</div>

```python
給定一個只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判斷字符串是否有效。

有效字符串需滿足：

左括號必須用相同類型的右括號閉合。
左括號必須以正確的順序閉合。
注意空字符串可被認為是有效字符串。
示例 1:

輸入: "()"
輸出: true
示例 2:

輸入: "()[]{}"
輸出: true
示例 3:

輸入: "(]"
輸出: false
示例 4:

輸入: "([)]"
輸出: false
示例 5:

輸入: "{[]}"
輸出: true
```

由於棧結構的特殊性，非常適合做對稱匹配類的題目。

首先要弄清楚，字符串里的括號不匹配有幾種情況。

一些同學，在面試中看到這種題目上來就開始寫代碼，然後就越寫越亂。

建議在寫代碼之前要分析好有哪幾種不匹配的情況，如果不在動手之前分析好，寫出的代碼也會有很多問題。

先來分析一下 這里有三種不匹配的情況，

第一種情況，字符串里左方向的括號多余了 ，所以不匹配。ex. **(** { {} }()

第二種情況，括號沒有多余，但是 括號的類型沒有匹配上。 ex. ( **{** [] **]** )

第三種情況，字符串里右方向的括號多余了，所以不匹配。 ex. ([{}])**)**

ok, 當我們寫的時候覆蓋這三種情況就可以了

![](https://camo.githubusercontent.com/3bf42ced954f15678c3e380095dd0e73406e6c35c221b32fbec95a972f7077b9/68747470733a2f2f636f64652d7468696e6b696e672e63646e2e626365626f732e636f6d2f676966732f32302e2545362539432538392545362539352538382545362538422541432545352538462542372e676966)

```python
class Solution:
    def isValid(self, s: str) -> bool:
        stack = []

        if len(s)%2 != 0:
            return False

        for item in s:

            if item == '(':
                stack.append(')')
            elif item == '[':
                stack.append(']')
            elif item == '{':
                stack.append('}')
            # 以上交代了左括號的處理
            
            elif len(stack)==0:# 第三種情況, 遇到右括號時，stack裡沒有了
                return False

            elif stack[-1] != item: #第二種情況
                return False
            
            else:
                stack.pop()
        
        if len(stack) == 0:
            return True
        else:
            return False
```

注意：第三種情況要先處理，因為如果stack == Null, 就不會有stack[-1]了


<div id = "1047" style="text-align: center;">
#1047, Remove All Adjacent Duplicates In String
</div>

```python
給出由小寫字母組成的字符串 S，重覆項刪除操作會選擇兩個相鄰且相同的字母，並刪除它們。

在 S 上反覆執行重覆項刪除操作，直到無法繼續刪除。

在完成所有重覆項刪除操作後返回最終的字符串。答案保證唯一。

示例：

輸入："abbaca"
輸出："ca"
解釋：例如，在 "abbaca" 中，我們可以刪除 "bb" 由於兩字母相鄰且相同，這是此時唯一可以執行刪除操作的重覆項。之後我們得到字符串 "aaca"，其中又只有 "aa" 可以執行重覆項刪除操作，所以最後的字符串為 "ca"。
提示：

1 <= S.length <= 20000
S 僅由小寫英文字母組成。
```

![](https://camo.githubusercontent.com/45dea5abadc6b39e7bc75091be9f372785756baa0c95a9a9d3edd11278b84493/68747470733a2f2f636f64652d7468696e6b696e672e63646e2e626365626f732e636f6d2f676966732f313034372e2545352538382541302545392539392541342545352541442539372545372541432541362545342542382542322545342542382541442545372539412538342545362538392538302545362539432538392545372539422542382545392538322542422545392538372538442545352541342538442545392541312542392e676966)


方法一(stack)：
```python
class Solution:
    def removeDuplicates(self, s: str) -> str:
        res = list()
        for item in s:
            if res and res[-1] == item:
                res.pop()
            else:
                res.append(item)
        return "".join(res)  # 字符串拼接
```
方法二(two pointers)：
```python
class Solution:
    def removeDuplicates(self, s: str) -> str:
        res = list(s)
        slow = fast = 0
        length = len(res)

        while fast < length:
            # 如果一樣直接換，不一樣會把後面的填在slow的位置
            res[slow] = res[fast]
            
            # 如果發現和前一個一樣，就退一格指針
            if slow > 0 and res[slow] == res[slow - 1]:
                slow -= 1
            else:
                slow += 1
            fast += 1
            
        return ''.join(res[0: slow])
```

<div id = "150" style="text-align: center;">
#150, Evaluate Reverse Polish Notation
</div>

```
根據 逆波蘭表示法，求表達式的值。

有效的運算符包括 + ,  - ,  * ,  / 。每個運算對象可以是整數，也可以是另一個逆波蘭表達式。

說明：

整數除法只保留整數部分。 給定逆波蘭表達式總是有效的。換句話說，表達式總會得出有效數值且不存在除數為 0 的情況。

示例 1：

輸入: ["2", "1", "+", "3", " * "]
輸出: 9
解釋: 該算式轉化為常見的中綴算術表達式為：((2 + 1) * 3) = 9
示例 2：

輸入: ["4", "13", "5", "/", "+"]
輸出: 6
解釋: 該算式轉化為常見的中綴算術表達式為：(4 + (13 / 5)) = 6
示例 3：

輸入: ["10", "6", "9", "3", "+", "-11", " * ", "/", " * ", "17", "+", "5", "+"]

輸出: 22

解釋:該算式轉化為常見的中綴算術表達式為：

((10 * (6 / ((9 + 3) * -11))) + 17) + 5       
= ((10 * (6 / (12 * -11))) + 17) + 5       
= ((10 * (6 / -132)) + 17) + 5     
= ((10 * 0) + 17) + 5     
= (0 + 17) + 5    
= 17 + 5    
= 22    
```

逆波蘭表達式：是一種後綴表達式，所謂後綴就是指運算符寫在後面。

平常使用的算式則是一種中綴表達式，如 ( 1 + 2 ) * ( 3 + 4 ) 。

該算式的逆波蘭表達式寫法為 ( ( 1 2 + ) ( 3 4 + ) * ) 。

逆波蘭表達式主要有以下兩個優點：

去掉括號後表達式無歧義，上式即便寫成 1 2 + 3 4 + * 也可以依據次序計算出正確結果。

適合用棧操作運算：遇到數字則入棧；遇到運算符則取出棧頂兩個數字進行計算，並將結果壓入棧中
```python
class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        stack = []
        for item in tokens:
            if item in '-+*/':
                num2 = stack.pop()
                num1 = stack.pop()
                if item == '-':
                    stack.append(num1 - num2)
                elif item == '+':
                    stack.append(num1 + num2)
                elif item == '/':
                    stack.append(int(num1 / num2))
                elif item == '*':
                    stack.append(num1 * num2)
            else:
                stack.append(int(item))
        return stack.pop()

```

<div id = "239" style="text-align: center;">
#239, Sliding Window Maximum
</div>

```
給定一個數組 nums，有一個大小為 k 的滑動窗口從數組的最左側移動到數組的最右側。你只可以看到在滑動窗口內的 k 個數字。滑動窗口每次只向右移動一位。

返回滑動窗口中的最大值。

進階：

你能在線性時間覆雜度內解決此題嗎？
```

![](https://camo.githubusercontent.com/00a9e45c3e505bad174865a9873c1727e7d3376105935bc23b980918fbbde8a4/68747470733a2f2f636f64652d7468696e6b696e672e63646e2e626365626f732e636f6d2f706963732f3233392ee6bb91e58aa8e7aa97e58fa3e69c80e5a4a7e580bc2e706e67)

這是使用單調隊列的經典題目。

難點是如何求一個區間里的最大值呢？ （這好像是廢話），暴力一下不就得了。

暴力方法，遍歷一遍的過程中每次從窗口中再找到最大的數值，這樣很明顯是O(n × k)的算法。

設計單調隊列的時候，pop，和push操作要保持如下規則：

pop(value)：如果窗口移除的元素value等於單調隊列的出口元素，那麽隊列彈出元素，否則不用任何操作

push(value)：如果push的元素value大於入口元素的數值，那麽就將隊列入口的元素彈出，直到push元素的數值小於等於隊列入口元素的數值為止

保持如上規則，每次窗口移動的時候，只要問que.front()就可以返回當前窗口的最大值。

為了更直觀的感受到單調隊列的工作過程，以題目示例為例，輸入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3，動畫如下：

![](https://camo.githubusercontent.com/1fb59b031f0d0d299009e28f1498f0b6853bf51a4e0c0a2bd5e4ab78d4947892/68747470733a2f2f636f64652d7468696e6b696e672e63646e2e626365626f732e636f6d2f676966732f3233392e2545362542422539312545352538412541382545372541412539372545352538462541332545362539432538302545352541342541372545352538302542432d322e676966)

```python
from collections import deque


class MyQueue: #單調隊列（從大到小
    def __init__(self):
        self.queue = deque() #這里需要使用deque實現單調隊列，直接使用list會超時
    
    #每次彈出的時候，比較當前要彈出的數值是否等於隊列出口元素的數值，如果相等則彈出。
    #同時pop之前判斷隊列當前是否為空。
    def pop(self, value):
        if self.queue and value == self.queue[0]:
            self.queue.popleft()#list.pop()時間覆雜度為O(n),這里需要使用collections.deque()
            
    #如果push的數值大於入口元素的數值，那麽就將隊列後端的數值彈出，直到push的數值小於等於隊列入口元素的數值為止。
    #這樣就保持了隊列里的數值是單調從大到小的了。
    def push(self, value):
        while self.queue and value > self.queue[-1]:
            self.queue.pop()
        self.queue.append(value)
        
    #查詢當前隊列里的最大值 直接返回隊列前端也就是front就可以了。
    def front(self):
        return self.queue[0]
    
class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        que = MyQueue()
        result = []
        for i in range(k): #先將前k的元素放進隊列
            que.push(nums[i])
        result.append(que.front()) #result 記錄前k的元素的最大值
        for i in range(k, len(nums)):
            que.pop(nums[i - k]) #滑動窗口移除最前面元素
            que.push(nums[i]) #滑動窗口前加入最後面的元素
            result.append(que.front()) #記錄對應的最大值
        return result
```

<div id = "347" style="text-align: center;">
#347, Sliding Window Maximum
</div>

```python
給定一個非空的整數數組，返回其中出現頻率前 k 高的元素。

示例 1:

輸入: nums = [1,1,1,2,2,3], k = 2
輸出: [1,2]
示例 2:

輸入: nums = [1], k = 1
輸出: [1]
提示：

你可以假設給定的 k 總是合理的，且 1 ≤ k ≤ 數組中不相同的元素的個數。
你的算法的時間覆雜度必須優於 𝑂(𝑛log𝑛), n 是數組的大小。
題目數據保證答案唯一，換句話說，數組中前 k 個高頻元素的集合是唯一的。
你可以按任意順序返回答案。
```

此時要思考一下，是使用小頂堆呢，還是大頂堆？

有的同學一想，題目要求前 K 個高頻元素，那麽果斷用大頂堆啊。

那麽問題來了，定義一個大小為k的大頂堆，在每次移動更新大頂堆的時候，每次彈出都把最大的元素彈出去了，那麽怎麽保留下來前K個高頻元素呢。

而且使用大頂堆就要把所有元素都進行排序，那能不能只排序k個元素呢？

所以我們要用小頂堆，因為要統計最大前k個元素，只有小頂堆每次將最小的元素彈出，最後小頂堆里積累的才是前k個最大元素。

![](https://camo.githubusercontent.com/300dc70b801cbb2ba285e33fd92c906c51a81c14021a23bcb3cfea4d027ee94d/68747470733a2f2f636f64652d7468696e6b696e672e63646e2e626365626f732e636f6d2f706963732f3334372e2545352538392538444b2545342542382541412545392541422539382545392541322539312545352538352538332545372542342541302e6a7067)

```python
#時間覆雜度：O(nlogk)
#空間覆雜度：O(n)

import heapq
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        map_ = {} 
        for i in range(len(nums)):
            map_[nums[i]] = map_.get(nums[i], 0) + 1
        
        #對頻率排序
        pri_que = [] #小頂堆
        #用固定大小為k的小頂堆，掃描所有頻率的數值
        for key, freq in map_.items():
            heapq.heappush(pri_que, (freq, key))
            if len(pri_que) > k: #如果堆的大小大於了K，則隊列彈出，保證堆的大小一直為k
                heapq.heappop(pri_que)
        
        #找出前K個高頻元素，因為小頂堆先彈出的是最小的，所以倒序來輸出到數組
        result = [0] * k
        for i in range(k-1, -1, -1):
            result[i] = heapq.heappop(pri_que)[1]
        return result
```

1. for key, freq in map_.items():

map_.items() 返回的是一個包含字典 map_ 中所有鍵值對的視圖，每個鍵值對以 (key, value) 的形式存在。

之所以需要加括號 () 是因為 items() 是一個方法調用，必須加括號才能執行這個方法，返回鍵值對的叠代器。

2. 當你調用 heapq.heappush(pri_que, (freq, key)) 時，heapq 會將 (freq, key) 元素插入到 pri_que 這個堆中，並且調整堆的結構以保持小頂堆的性質。堆的排序規則是按照第一個元素（即 freq）進行比較的，因為 heapq 默認會根據元組的第一個元素來排序。

3. 當堆的大小超過 k 時，你調用 heapq.heappop(pri_que)，這會移除並返回堆頂（最小的 freq 值）元素，然後堆的最後一個元素會被移到堆頂，並向下調整，以維持小頂堆的性質。

4. 那如果是大頂堆呢

在 Python 的 heapq 模塊中，默認實現的是小頂堆（即堆頂元素是最小的）。要實現大頂堆，可以通過對元素的值取反，或者將比較邏輯反轉來實現。

 heapq.heappush(max_heap, (-freq, key))

 ## 二叉樹

![](https://camo.githubusercontent.com/17867c9f73064ce8e220e9fa4d5ded9b5ab2d1b00758d96cb3b67754a7e30915/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f32303234303432343137323233312e706e67)

前中後，其實指的就是中間節點的遍歷順序，只要大家記住 前中後序指的就是中間節點的位置就可以了。

看如下中間節點的順序，就可以發現，中間節點的順序就是所謂的遍歷方式

前序遍歷：中左右
中序遍歷：左中右
後序遍歷：左右中

```python
class TreeNode:
    def __init__(self, val, left = None, right = None):
        self.val = val
        self.left = left
        self.right = right
```
### binary tree traversal(Recurrsive)

這次我們要好好談一談遞歸，為什麽很多同學看遞歸算法都是“一看就會，一寫就廢”。

主要是對遞歸不成體系，沒有方法論，每次寫遞歸算法 ，都是靠玄學來寫代碼，**代碼能不能編過都靠運氣**。

本篇將介紹前後中序的遞歸寫法，一些同學可能會感覺很簡單，其實不然，我們要通過簡單題目把方法論確定下來，有了方法論，後面才能應付覆雜的遞歸。

這里幫助大家確定下來遞歸算法的三個要素。每次寫遞歸，都按照這三要素來寫，可以保證大家寫出正確的遞歸算法！

1. 確定遞歸函數的參數和返回值： 確定哪些參數是遞歸的過程中需要處理的，那麽就在遞歸函數里加上這個參數， 並且還要明確每次遞歸的返回值是什麽進而確定遞歸函數的返回類型。

2. 確定終止條件： 寫完了遞歸算法, 運行的時候，經常會遇到棧溢出的錯誤，就是沒寫終止條件或者終止條件寫的不對，操作系統也是用一個棧的結構來保存每一層遞歸的信息，如果遞歸沒有終止，操作系統的內存棧必然就會溢出。

3. 確定單層遞歸的邏輯： 確定每一層遞歸需要處理的信息。在這里也就會重覆調用自己來實現遞歸的過程。

舉例(前序):

1. 確定遞歸函數的參數和返回值：因為要打印出前序遍歷節點的數值，所以參數里需要傳入vec來放節點的數值，除了這一點就不需要再處理什麽數據了也不需要有返回值，所以遞歸函數返回類型就是void，代碼如下：

```python
def traversal(cur, vec):
```

2. 確定終止條件：在遞歸的過程中，如何算是遞歸結束了呢，當然是當前遍歷的節點是空了，那麽本層遞歸就要結束了，所以如果當前遍歷的這個節點是空，就直接return，代碼如下：

```python
if cur is None:
    return
```

3. 確定單層遞歸的邏輯：前序遍歷是中左右的順序，所以在單層遞歸的邏輯，是要先取中節點的數值，代碼如下：

```python
vec.append(cur.val)  # 中
traversal(cur.left, vec)  # 左
traversal(cur.right, vec)  # 右
```

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        result = []
        self.traversal(root,result)
        return result
    def traversal(self, cur, vec):
        if not cur:
            return
        vec.append(cur.val)
        self.traversal(cur.left, vec)
        self.traversal(cur.right,vec)
```

## binary tree traversal(iterative)

不難寫出以下:

```python
class Solution:
    def preorderTraversal(self, root):
        stack = []
        result = []
        if root is None:
            return result
        stack.append(root)
        while stack:
            node = stack.pop()  # 中
            result.append(node.val)
            if node.right:
                stack.append(node.right)  # 右（空節點不入棧）
            if node.left:
                stack.append(node.left)  # 左（空節點不入棧）
        return result
```

**注意:棧用於存儲尚未處理的節點。棧是後進先出（LIFO）的數據結構，這意味著你最後壓入棧的節點會最先被彈出處理。**

此時是不是想改一點前序遍歷代碼順序就把中序遍歷搞出來了？

其實還真不行！

但接下來，再用叠代法寫中序遍歷的時候，會發現套路又不一樣了，目前的前序遍歷的邏輯無法直接應用到中序遍歷上。

為了解釋清楚，我說明一下 剛剛在叠代的過程中，其實我們有兩個操作：

1. 處理：將元素放進result數組中
2. 訪問：遍歷節點

分析一下為什麽剛剛寫的前序遍歷的代碼，不能和中序遍歷通用呢，因為前序遍歷的順序是中左右，先訪問的元素是中間節點，要處理的元素也是中間節點，所以剛剛才能寫出相對簡潔的代碼，因為要訪問的元素和要處理的元素順序是一致的，都是中間節點。

那麽再看看中序遍歷，中序遍歷是左中右，先訪問的是二叉樹頂部的節點，然後一層一層向下訪問，直到到達樹左面的最底部，再開始處理節點（也就是在把節點的數值放進result數組中），這就造成了處理順序和訪問順序是不一致的。

那麽在使用叠代法寫中序遍歷，就需要借用指針的遍歷來幫助訪問節點，棧則用來處理節點上的元素。

```python
class TreeNode:
    def __init__(self, value=0, left=None, right=None):
        self.val = value
        self.left = left
        self.right = right

class Solution:
    def inorder_traversal(self, root):
        result = []
        stack = []
        current_node = root
        
        while current_node is not None or stack:
            if current_node is not None: # 指針來訪問節點，訪問到最底層
                stack.append(current_node)  #  將訪問的節點放進棧
                current_node = current_node.left  # Left
            else:
                current_node = stack.pop()  # 從棧里彈出的數據，就是要處理的數據（放進result數組里的數據）
                result.append(current_node.val)  # Middle
                current_node = current_node.right  # Right
        
        return result
```
後序:
```python
class Solution:
    def postorder_traversal(self, root):
        stack = []
        result = []
        if root is None:
            return result
        stack.append(root)
        while stack:
            node = stack.pop()
            result.append(node.val)
            if node.left:
                stack.append(node.left)  # 相对于前序遍历，这更改一下入栈顺序 （空节点不入栈）
            if node.right:
                stack.append(node.right)  # 空节点不入栈
        result.reverse()  # 将结果反转之后就是左右中的顺序了
        return result
```
**就不能統一風格嗎!**

重頭戲來了，接下來介紹一下統一寫法。

我們以中序遍歷為例，用stack無法同時解決訪問節點（遍歷節點）和處理節點（將元素放進結果集）不一致的情況。

那我們就將訪問的節點放入棧中，把要處理的節點也放入棧中但是要做標記。

如何標記呢，就是要處理的節點放入棧之後，緊接著放入一個空指針作為標記。 這種方法也可以叫做標記法。

中序:

```python
class Solution:
    def inorderTraversal(self, root):
        result = []
        st = []
        if root is not None:
            st.append(root)
        while st:
            node = st.pop()
            if node is not None:
                st.append(node.right)  # 添加右節點（空節點不入棧）

                st.append(node)        # 添加中節點
                st.append(None)        # 中節點已訪問過，但尚未處理，加入空節點作為標記。

                st.append(node.left)   # 添加左節點（空節點不入棧）
            else:  # 只有遇到空節點時，才將下一個節點放入結果集中
                st.pop()                # 將空節點彈出
                node = st.pop()         # 重新取出棧中的元素
                result.append(node.val) # 加入到結果集中
        return result
```
利用空節點 (None) 來標記已訪問過的節點：

當遇到一個空節點時，說明之前已經遍歷過該節點的左子樹，現在需要處理該節點（中節點）。

闡述:

初始化
初始化：
result = []：一個空列表，用於存儲最終的中序遍歷結果。
st = []：一個空棧，用於在遍歷過程中暫存節點。
if root is not None: 確認根節點 1 非空後，st.append(root) 將根節點 1 壓入棧中。

主循環開始:

第一輪循環：

st.pop() 彈出 1，此時 st = []。
if node is not None:：node 是 1，所以不是 None。
按照代碼順序：
將 1 的右子節點 2 壓入棧中（st = [2]）。
將節點 1 自己壓入棧中（st = [2, 1]）。
將一個 None 壓入棧中作為標記（st = [2, 1, None]）。
將 1 的左子節點（因為 1 沒有左子節點，所以什麽也不做）。

第二輪循環：

st.pop() 彈出 None（標記），此時 st = [2, 1]。
因為 node 是 None，跳到 else 部分：
st.pop() 彈出 1，此時 st = [2]。
將 1 的值加入 result，此時 result = [1]。

第三輪循環：

st.pop() 彈出 2，此時 st = []。
if node is not None:：node 是 2，所以不是 None。
按照代碼順序：
將 2 的右子節點（因為 2 沒有右子節點，所以什麽也不做）。
將節點 2 自己壓入棧中（st = [2]）。
將一個 None 壓入棧中作為標記（st = [2, None]）。
將 2 的左子節點 3 壓入棧中（st = [2, None, 3]）。

第四輪循環：

st.pop() 彈出 3，此時 st = [2, None]。
if node is not None:：node 是 3，所以不是 None。
按照代碼順序：
將 3 的右子節點（因為 3 沒有右子節點，所以什麽也不做）。
將節點 3 自己壓入棧中（st = [2, None, 3]）。
將一個 None 壓入棧中作為標記（st = [2, None, 3, None]）。
將 3 的左子節點（因為 3 沒有左子節點，所以什麽也不做）。

第五輪循環：

st.pop() 彈出 None（標記），此時 st = [2, None, 3]。
因為 node 是 None，跳到 else 部分：
st.pop() 彈出 3，此時 st = [2, None]。
將 3 的值加入 result，此時 result = [1, 3]。

第六輪循環：

st.pop() 彈出 None（標記），此時 st = [2]。
因為 node 是 None，跳到 else 部分：
st.pop() 彈出 2，此時 st = []。
將 2 的值加入 result，此時 result = [1, 3, 2]。
結束
棧為空，退出循環。
返回 result = [1, 3, 2]，這是最終的中序遍歷結果。

```python
class Solution:
    def traverse(self, root, order="inorder"):
        result = []
        st = []
        if root is not None:
            st.append(root)
        while st:
            node = st.pop()
            if node is not None:
                if order == "preorder":  # 前序遍歷：中 -> 左 -> 右
                    if node.right:
                        st.append(node.right)
                    if node.left:
                        st.append(node.left)
                    st.append(node)
                    st.append(None)
                elif order == "inorder":  # 中序遍歷：左 -> 中 -> 右
                    if node.right:
                        st.append(node.right)
                    st.append(node)
                    st.append(None)
                    if node.left:
                        st.append(node.left)
                elif order == "postorder":  # 後序遍歷：左 -> 右 -> 中
                    st.append(node)
                    st.append(None)
                    if node.right:
                        st.append(node.right)
                    if node.left:
                        st.append(node.left)
            else:
                st.pop()
                node = st.pop()
                result.append(node.val)
        return result

# 使用例子
solution = Solution()

# 假设 root 是你的二叉树的根节点
# 可以调用不同的遍历方法
preorder_result = solution.traverse(root, order="preorder")
inorder_result = solution.traverse(root, order="inorder")
postorder_result = solution.traverse(root, order="postorder")

print("Preorder:", preorder_result)
print("Inorder:", inorder_result)
print("Postorder:", postorder_result)
```

<div id = "102" style="text-align: center;">
#102, Binary Tree Level Order Traversal
</div>

```
Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).


Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
```

層序遍歷一個二叉樹。就是從左到右一層一層的去遍歷二叉樹。這種遍歷的方式和我們之前講過的都不太一樣。

需要借用一個輔助數據結構即隊列來實現，隊列先進先出，符合一層一層遍歷的邏輯，而用棧先進後出適合模擬深度優先遍歷也就是遞歸的邏輯。

層序遍歷方式就是廣度優先遍歷，就是要用到queue

會了這個可以一個打十個

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        res = []
        if not root:
            return []
        queue = collections.deque()
        queue.append(root)
        while queue:
            queue_len = len(queue)
            curr_list = []
            for i in range(queue_len):
                node = queue.popleft()
                curr_list.append(node.val)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            res.append(curr_list)
        return res
```

<div id = "226" style="text-align: center;">
#226, Invert binary Tree
</div>

```
Given the root of a binary tree, invert the tree, and return its root.
```
![](https://assets.leetcode.com/uploads/2021/03/14/invert1-tree.jpg)

這道題，可以用前序及後序來解。

```python
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if root == None:
            return
        self.invertTree(root.left)
        self.invertTree(root.right)
        root.left, root.right = root.right, root.left
        return root
```

<div id = "101" style="text-align: center;">
#101, Symmetric Tree
</div>

```
給你一個二叉樹，檢查他有沒有對稱
```

![](https://assets.leetcode.com/uploads/2021/02/19/symtree1.jpg)

**對二叉樹題目來說，確定遍歷方式是最重要的**

先想清楚，判斷對稱二叉樹要比較的是哪兩個節點，要比較的可不是左右節點！

對於二叉樹是否對稱，要比較的是根節點的左子樹與右子樹是不是相互翻轉的，理解這一點就知道了其實我們要比較的是兩個樹（這兩個樹是根節點的左右子樹），所以在遞歸遍歷的過程中，也是要同時遍歷兩棵樹。

那麽如何比較呢？

比較的是兩個子樹的里側和外側的元素是否相等。如圖所示：

![](https://camo.githubusercontent.com/af0be100cd04a571c2f4ab50c3ba23c77326ee2ed2a8073df2aeacf130ba0fd6/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f32303231303230333134343632343431342e706e67)

其實，這一題只能用**後序**，為什麼？因為左右中的特性可以確定收集完所有子節點的情況再返回給上一層（中）。

```python
class Solution:
    def isSymmetric(self, root: TreeNode) -> bool:
        if not root:
            return True
        return self.compare(root.left, root.right)
        
    def compare(self, left, right):
        #首先排除空節點的情況
        if left == None and right != None: return False
        elif left != None and right == None: return False
        elif left == None and right == None: return True
        #排除了空節點，再排除數值不相同的情況
        elif left.val != right.val: return False
        
        #此時就是：左右節點都不為空，且數值相同的情況
        #此時才做遞歸，做下一層的判斷
        outside = self.compare(left.left, right.right) #左子樹：左、 右子樹：右
        inside = self.compare(left.right, right.left) #左子樹：右、 右子樹：左
        isSame = outside and inside #左子樹：中、 右子樹：中 （邏輯處理）
        return isSame
```

<div id = "104" style="text-align: center;">
#104, Maximum Depth of Binary Tree
</div>

```
給定一個二叉樹，找出其最大深度。

二叉樹的深度為根節點到最遠葉子節點的最長路徑上的節點數。

說明: 葉子節點是指沒有子節點的節點。

示例： 給定二叉樹 [3,9,20,null,null,15,7]，

return: 3
```
![](https://camo.githubusercontent.com/5dce4befc4f2b696249db7143f48e3c01a4b9906dcfc58fa996522867e3bb56f/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f32303231303230333135333033313931342d32303233303331303132313830393930322e706e67)

什麼是深度、什麼是高度？

深度：任一node到root節點的距離（前序）

高度：任一node到leaf的距離(後序)

因為後序（高度）就是最大深度，所以這一題可以用後序求深度。

```python
class Solution:
    def maxdepth(self, root: treenode) -> int:
        return self.getdepth(root)
        
    def getdepth(self, node):
        if not node:
            return 0
        leftheight = self.getdepth(node.left) #左
        rightheight = self.getdepth(node.right) #右
        height = 1 + max(leftheight, rightheight) #中
        return height
```

<div id = "111" style="text-align: center;">
#111, Minimum Depth of Binary Tree
</div>

```
給定一個二叉樹，找出其最小深度。

最小深度是從根節點到最近葉子節點的最短路徑上的節點數量。

說明: 葉子節點是指沒有子節點的節點。

示例:

給定二叉樹 [3,9,20,null,null,15,7],

result = 2
```

![](https://camo.githubusercontent.com/49722c1ecb29edd4e3bce38f25ef8eae06429c14f1fbf880edaa0a38801fb2b8/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f323032313032303331353538323538362e706e67)

1. 確定遞歸函數的參數和返回值
```python
int getDepth(TreeNode* node)
```
2. 確定終止條件
```python
if (node == NULL) return 0;
```

3. 確定單層遞歸的邏輯

這塊和求最大深度可就不一樣了，一些同學可能會寫如下代碼：

```python
int leftDepth = getDepth(node->left);
int rightDepth = getDepth(node->right);
int result = 1 + min(leftDepth, rightDepth);
return result;
```

這個代碼就犯了此圖中的誤區：

![](https://camo.githubusercontent.com/e7bdb1c3c567fad8cfeb207c290b54309e01aec9d269cf48bc64e6543029835f/68747470733a2f2f636f64652d7468696e6b696e672e63646e2e626365626f732e636f6d2f706963732f3131312e2545342542412538432545352538462538392545362541302539312545372539412538342545362539432538302545352542302538462545362542372542312545352542412541362e706e67)

如果這麽求的話，沒有左孩子的分支會算為最短深度。

所以，如果左子樹為空，右子樹不為空，說明最小深度是 1 + 右子樹的深度。

反之，右子樹為空，左子樹不為空，最小深度是 1 + 左子樹的深度。 最後如果左右子樹都不為空，返回左右子樹深度最小值 + 1 。

代碼如下：

```python
class Solution:
    def getDepth(self, node):
        if node is None:
            return 0
        leftDepth = self.getDepth(node.left)  # 左
        rightDepth = self.getDepth(node.right)  # 右
        
        # 當一個左子樹為空，右不為空，這時並不是最低點
        if node.left is None and node.right is not None:
            return 1 + rightDepth
        
        # 當一個右子樹為空，左不為空，這時並不是最低點
        if node.left is not None and node.right is None:
            return 1 + leftDepth
        
        result = 1 + min(leftDepth, rightDepth)
        return result

    def minDepth(self, root):
        return self.getDepth(root)

```

<div id = "222" style="text-align: center;">
#222, Count Complete Tree Nodes
</div>

```
給出一個完全二叉樹，求出該樹的節點個數。

示例 1：

輸入：root = [1,2,3,4,5,6]
輸出：6
```

**定義:完全二叉樹只有兩種情況，情況一：就是滿二叉樹，情況二：最後一層葉子節點沒有滿。**

我們先來講，普通二叉樹該怎麼解（前、中、後都可以，後序簡單一點）：
```python
def counting(self, node: TreeNode)->int:
    if not node: return 0
    leftCount = self.counting(node.left)
    rightCount = self.counting(node.right)
    result = 1+ leftCount + rightCount
    return result
    #O(n)
```

完全二叉樹的特性

在完全二叉樹中，除了最底層節點可能沒填滿外，其余每層節點數都達到最大值，並且最下面一層的節點都集中在該層最左邊的若幹位置。若最底層為第 h 層，則該層包含 1~ 2^(h-1)  個節點。

1. 對於情況一，可以直接用 2^樹深度 - 1 來計算，注意這里根節點深度為1。

2. 對於情況二，分別遞歸左孩子，和右孩子，遞歸到某一深度一定會有左孩子或者右孩子為滿二叉樹，然後依然可以按照情況1來計算。

![](https://camo.githubusercontent.com/dca3a41d253c7c0fe9e893637040b3ee7fbf835c1dfd45e19550a7299acf21be/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f32303230313132343039323534333636322e706e67)

而我們應該要**判斷其子樹是不是滿二叉樹，如果是則直接利用公式計算這個子樹（滿二叉樹）的節點數量，如果不是則繼續遞歸** 這樣不管是完全二叉樹或滿二叉樹都可以控制在O(long*logn)

```python
class Solution: # 利用完全二叉樹特性
    def countNodes(self, root: TreeNode) -> int:
        if not root: return 0
        count = 1
        left = root.left; right = root.right
        while left and right:
            count+=1
            left = left.left; right = right.right
        if not left and not right: # 如果同時到底說明是滿二叉樹，反之則不是
            return 2**count-1
        return 1+self.countNodes(root.left)+self.countNodes(root.right)  
```

<div id = "110" style="text-align: center;">
#110, Balanced Binary Tree
</div>

```
給定一個二叉樹，判斷它是否是高度平衡的二叉樹。

本題中，一棵高度平衡二叉樹定義為：一個二叉樹每個節點 的左右兩個子樹的高度差的絕對值不超過1。

示例 1:

給定二叉樹 [3,9,20,null,null,15,7]

return True
```

![](https://camo.githubusercontent.com/08b0bab108b3a19d05a70994e6d9618de3ab80b044c09103ff618d0a97fa94ad/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f323032313032303331353534323233302e706e67)

關於根節點的深度究竟是1 還是 0，不同的地方有不一樣的標準，leetcode的題目中都是以節點為一度，即根節點深度是1。但維基百科上定義用邊為一度，即根節點的深度是0，我們暫時以leetcode為準（畢竟要在這上面刷題）。

此時大家應該明白了既然要求比較高度，必然是要後序遍歷。

如何判斷以當前傳入節點為根節點的二叉樹是否是平衡二叉樹呢？當然是其左子樹高度和其右子樹高度的差值。

分別求出其左右子樹的高度，然後如果差值小於等於1，則返回當前二叉樹的高度，否則返回-1，表示已經不是二叉平衡樹了。

```python
class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        if self.get_hight(root) != -1:
            return True
        else: 
            return False
    def get_hight(self, node) -> int:
        if not node:
            return 0
        leftHight = self.get_hight(node.left)
        rightHight = self.get_hight(node.right)
        if leftHight == -1 or rightHight == -1 or abs(leftHight - rightHight) > 1:
            return -1
        return max(leftHight, rightHight) + 1
```

<div id = "257" style="text-align: center;">
#257, Binary Tree Paths
</div>

```
給定一個二叉樹，返回所有從根節點到葉子節點的路徑。

說明: 葉子節點是指沒有子節點的節點。
```

![](https://camo.githubusercontent.com/fb1c9b6a043b04a3506fe3af3fc02700b708d18ae0b7c63f42ec6d78eb375358/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f323032313032303431353136313537362e706e67)

這道題目要求從根節點到葉子的路徑，所以需要前序遍歷，這樣才方便讓父節點指向孩子節點，找到對應的路徑。

![](https://camo.githubusercontent.com/b26ffbe6faa8cf404a5a645beff276c5c9fac3a47cda0c1caa085517d8c3a043/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f32303231303230343135313730323434332e706e67)

```python
class Solution:
    def traversal(self, cur, path, result):
        path.append(cur.val)  # 中
        if not cur.left and not cur.right:  # 到達葉子節點
            sPath = '->'.join(map(str, path)) #str 函數會將傳入的整數轉換為對應的字串
            result.append(sPath)
            return
        if cur.left:  # 左
            self.traversal(cur.left, path, result)
            path.pop()  # 回溯
        if cur.right:  # 右
            self.traversal(cur.right, path, result)
            path.pop()  # 回溯

    def binaryTreePaths(self, root):
        result = []
        path = []
        if not root:
            return result
        self.traversal(root, path, result)
        return result
```

<div id = "404" style="text-align: center;">
#404, Sum of Left Leaves
</div>

```
計算給定二叉樹的所有左葉子之和。
```

![](https://camo.githubusercontent.com/89dd906b803284b60d99b9fd853742672d526fee352ccd2637e8c03975437d75/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f32303231303230343135313932373635342e706e67)

![](https://camo.githubusercontent.com/b8ccf277a1710b3d5df5c5ec92b84d9a14deffa2e9a315f90af379a492e9f2ef/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f32303232303930323136353830352e706e67)

相信通過這兩個圖，大家對最左葉子的定義有明確理解了。

那麽判斷當前節點是不是左葉子是無法判斷的，必須要通過節點的父節點來判斷其左孩子是不是左葉子。

如果該節點的左節點不為空，該節點的左節點的左節點為空，該節點的左節點的右節點為空，則找到了一個左葉子

```python
if node.left is not None and node.left.left is None and node.left.right is None:
    # 左葉子節點處理邏輯
```

遞歸的遍歷順序為後序遍歷（左右中），是因為要通過遞歸函數的返回值來累加求取左葉子數值之和。

遞歸三部曲：

1. 確定遞歸函數的參數和返回值
判斷一個樹的左葉子節點之和，那麽一定要傳入樹的根節點，遞歸函數的返回值為數值之和，所以為int

使用題目中給出的函數就可以了。

2. 確定終止條件
如果遍歷到空節點，那麽左葉子值一定是0

```python
if root is None:
    return 0
```
注意，只有當前遍歷的節點是父節點，才能判斷其子節點是不是左葉子。 所以如果當前遍歷的節點是葉子節點，那其左葉子也必定是0，那麽終止條件為：
```python
if root is None:
    return 0
if root.left is None and root.right is None:
    return 0 #其實這個也可以不寫，如果不寫不影響結果，但就會讓遞歸多進行了一層。
 ```
3. 確定單層遞歸的邏輯
當遇到左葉子節點的時候，記錄數值，然後通過遞歸求取左子樹左葉子之和，和 右子樹左葉子之和，相加便是整個樹的左葉子之和。

代碼如下：

```python
left_value = sum_of_left_leaves(root.left)  # 左
if root.left and not root.left.left and not root.left.right:
    left_value = root.left.val
right_value = sum_of_left_leaves(root.right)  # 右

sum_value = left_value + right_value  # 中
return sum_value

```

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def sumOfLeftLeaves(self, root):
        if root is None:
            return 0
        if root.left is None and root.right is None: # 遇到子葉情況，子葉本身的數值已經被父節點紀錄了
            return 0
        
        leftValue = self.sumOfLeftLeaves(root.left)  # 左
        if root.left and not root.left.left and not root.left.right:  # 左子樹是左葉子的情况
            leftValue = root.left.val
            
        rightValue = self.sumOfLeftLeaves(root.right)  # 右

        sum_val = leftValue + rightValue  # 中
        return sum_val
```

<div id = "513" style="text-align: center;">
#513, Find Bottom Left Tree Value
</div>

```
給定一個二叉樹，在樹的最後一行找到最左邊的值。
```

![](https://camo.githubusercontent.com/1678afc10af4f1c0efe20984b74f8f620d99837b1dafd3f0b9bb10c72d73941f/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f32303231303230343135333031373538362e706e67)

我們來分析一下題目：在樹的最後一行找到最左邊的值。

首先要是最後一行，然後是最左邊的值。

如果使用遞歸法，如何判斷是最後一行呢，其實就是深度最大的葉子節點一定是最後一行。

所以要找深度最大的葉子節點。

那麽如何找最左邊的呢？可以使用前序遍歷（當然中序，後序都可以，因為本題沒有 中間節點的處理邏輯，只要左優先就行），保證優先左邊搜索，然後記錄深度最大的葉子節點，此時就是樹的最後一行最左邊的值。

```python
class Solution:
    def findBottomLeftValue(self, root: TreeNode) -> int:
        self.max_depth = float('-inf')
        self.result = None
        self.traversal(root, 0)
        return self.result
    
    def traversal(self, node, depth):
        if not node.left and not node.right:
            if depth > self.max_depth:
                self.max_depth = depth
                self.result = node.val
            return
        
        if node.left:
            depth += 1
            self.traversal(node.left, depth)
            depth -= 1
        if node.right:
            depth += 1
            self.traversal(node.right, depth)
            depth -= 1
```

本題使用層序遍歷再合適不過了，比遞歸要好理解得多！

只需要記錄最後一行第一個節點的數值就可以了。

```python
from collections import deque
class Solution:
    def findBottomLeftValue(self, root):
        if root is None:
            return 0
        queue = deque()
        queue.append(root)
        result = 0
        while queue:
            size = len(queue)
            for i in range(size):
                node = queue.popleft()
                if i == 0:
                    result = node.val
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
        return result
```

<div id = "112" style="text-align: center;">
#112, Path Sum
</div>

```
給定一個二叉樹和一個目標和，判斷該樹中是否存在根節點到葉子節點的路徑，這條路徑上所有節點值相加等於目標和。

說明: 葉子節點是指沒有子節點的節點。

示例: 給定如下二叉樹，以及目標和 sum = 22，
```

![](https://camo.githubusercontent.com/d8322d94529540b74abc6ec8e1124d8a7c76486a87f14bd0c09fcb8b94211a78/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f32303233303430373231303234372e706e67)

```
返回 true, 因為存在目標和為 22 的根節點到葉子節點的路徑 5->4->11->2。
```

由於我們沒有必要整棵樹都跑完，只要一條路徑中了，就可以返回 true了。

所以，遞歸第一部曲：確定遞歸參數和返回值。我們就要返回bool。

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def traversal(self, cur: TreeNode, count: int) -> bool:
        if not cur.left and not cur.right and count == 0: # 遇到葉子節點，並且計數為0
            return True
        if not cur.left and not cur.right: # 遇到葉子節點直接返回
            return False
        
        if cur.left: # 左
            count -= cur.left.val
            if self.traversal(cur.left, count): # 遞歸，處理節點
                return True
            count += cur.left.val # 回溯，撤銷處理結果
            
        if cur.right: # 右
            count -= cur.right.val
            if self.traversal(cur.right, count): # 遞歸，處理節點
                return True
            count += cur.right.val # 回溯，撤銷處理結果
            
        return False
    
    def hasPathSum(self, root: TreeNode, sum: int) -> bool:
        if root is None:
            return False
        return self.traversal(root, sum - root.val)      
```

```python
class Solution:
    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
        if not root:
            return False
        if root.val == targetSum and not root.left and not root.right:
            return True
        return self.hasPathSum(root.left,targetSum - root.val) or self.hasPathSum(root.right,targetSum - root.val)
```

<div id = "106" style="text-align: center;">
#106, Construct Binary Tree from Inorder and Postorder Traversal
</div>

```python
給妳inorder, postorder, 做出整棵樹

Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
Output: [3,9,20,null,null,15,7]
```
![](https://assets.leetcode.com/uploads/2021/02/19/tree.jpg)

首先回憶一下如何根據兩個順序構造一個唯一的二叉樹，相信理論知識大家應該都清楚，就是以 後序數組的最後一個元素為切割點，先切中序數組，根據中序數組，反過來再切後序數組。一層一層切下去，每次後序數組最後一個元素就是節點元素。

如果讓我們肉眼看兩個序列，畫一棵二叉樹的話，應該分分鐘都可以畫出來。

流程如圖：

![](https://camo.githubusercontent.com/0b007e4086174a2587b02c3ea8eaa8dba0534ab8e639a2907e13047917cd9db5/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f32303231303230333135343234393836302e706e67)

那麽代碼應該怎麽寫呢？

說到一層一層切割，就應該想到了遞歸。

來看一下一共分幾步：

第一步：如果數組大小為零的話，說明是空節點了。

第二步：如果不為空，那麽取後序數組最後一個元素作為節點元素。

第三步：找到後序數組最後一個元素在中序數組的位置，作為切割點

第四步：切割中序數組，切成中序左數組和中序右數組 （順序別搞反了，一定是先切中序數組）

第五步：切割後序數組，切成後序左數組和後序右數組

第六步：遞歸處理左區間和右區間

寫出來是這樣的：

```python
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def traversal(inorder, postorder):
    # 第一步
    if len(postorder) == 0:
        return None

    # 第二步：後序遍歷數組最後一個元素，就是當前的中間節點
    root_value = postorder[-1]
    root = TreeNode(root_value)

    # 葉子節點
    if len(postorder) == 1:
        return root

    # 第三步：找切割點
    delimiter_index = 0
    for delimiter_index in range(len(inorder)):
        if inorder[delimiter_index] == root_value:
            break

    # 第四步：切割中序數組，得到 中序左數組和中序右數組
    inorder_left = inorder[:delimiter_index]
    inorder_right = inorder[delimiter_index + 1:]

    # 第五步：切割後序數組，得到 後序左數組和後序右數組
    postorder_left = postorder[:delimiter_index]
    postorder_right = postorder[delimiter_index:-1]

    # 第六步
    root.left = traversal(inorder_left, postorder_left)
    root.right = traversal(inorder_right, postorder_right)

    return root
```

難點大家應該發現了，就是如何切割，以及邊界值找不好很容易亂套。

此時應該注意確定切割的標準，是左閉右開，還有左開右閉，還是左閉右閉，這個就是不變量，要在遞歸中保持這個不變量。

在切割的過程中會產生四個區間，把握不好不變量的話，一會左閉右開，一會左閉右閉，必然亂套！

105 題：Construct Binary Tree from Preorder and Inorder Traversal

```python
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> TreeNode:
        # 第一步: 特殊情況討論: 樹為空. 或者說是遞歸終止條件
        if not preorder:
            return None

        # 第二步: 前序遍歷的第一個就是當前的中間節點.
        root_val = preorder[0]
        root = TreeNode(root_val)

        # 第三步: 找切割點.
        separator_idx = inorder.index(root_val)

        # 第四步: 切割inorder數組. 得到inorder數組的左,右半邊.
        inorder_left = inorder[:separator_idx]
        inorder_right = inorder[separator_idx + 1:]

        # 第五步: 切割preorder數組. 得到preorder數組的左,右半邊.
        # ⭐️ 重點1: 中序數組大小一定跟前序數組大小是相同的.
        preorder_left = preorder[1:1 + len(inorder_left)]
        preorder_right = preorder[1 + len(inorder_left):]

        # 第六步: 遞歸
        root.left = self.buildTree(preorder_left, inorder_left)
        root.right = self.buildTree(preorder_right, inorder_right)
        # 第七步: 返回答案
        return root
```

106題：Construct Binary Tree from Inorder and Postorder Traversal

```python
class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> TreeNode:
        # 第一步: 特殊情況討論: 樹為空. (遞歸終止條件)
        if not postorder:
            return None

        # 第二步: 後序遍歷的最後一個就是當前的中間節點.
        root_val = postorder[-1]
        root = TreeNode(root_val)

        # 第三步: 找切割點.
        separator_idx = inorder.index(root_val)

        # 第四步: 切割inorder數組. 得到inorder數組的左,右半邊.
        inorder_left = inorder[:separator_idx]
        inorder_right = inorder[separator_idx + 1:]

        # 第五步: 切割postorder數組. 得到postorder數組的左,右半邊.
        # ⭐️ 重點1: 中序數組大小一定跟後序數組大小是相同的.
        postorder_left = postorder[:len(inorder_left)]
        postorder_right = postorder[len(inorder_left): len(postorder) - 1]

        # 第六步: 遞歸
        root.left = self.buildTree(inorder_left, postorder_left)
        root.right = self.buildTree(inorder_right, postorder_right)
         # 第七步: 返回答案
        return root
```
<div id = "654" style="text-align: center;">
#654, Maximum Binary Tree
</div>

```
給定一個不含重覆元素的整數數組。一個以此數組構建的最大二叉樹定義如下：

二叉樹的根是數組中的最大元素。
左子樹是通過數組中最大值左邊部分構造出的最大二叉樹。
右子樹是通過數組中最大值右邊部分構造出的最大二叉樹。
通過給定的數組構建最大二叉樹，並且輸出這個樹的根節點。
```
![](https://camo.githubusercontent.com/14332ec6f1973132ed79c8c45e0b8d41b086b3bb5bb3c6d9eef9d633771cad3e/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f32303231303230343135343533343739362e706e67)

構造樹一般采用的是前序遍歷，因為先構造中間節點，然後遞歸構造左子樹和右子樹。

1. 確定參數返回值

```python
def constructMaximumBinaryTree(self, nums: List[int]) -> TreeNode:
```

2. 確定終止條件

題目中說了輸入的數組大小一定是大於等於1的，所以我們不用考慮小於1的情況，那麽當遞歸遍歷的時候，如果傳入的數組大小為1，說明遍歷到了葉子節點了。

那麽應該定義一個新的節點，並把這個數組的數值賦給新的節點，然後返回這個節點。 這表示一個數組大小是1的時候，構造了一個新的節點，並返回。
```python
if len(nums) == 1:
            return TreeNode(nums[0])
```

3. 確定單層遞歸邏輯

這里有三步工作:

    1. 先要找到數組中最大的值和對應的下標， 最大的值構造根節點，下標用來下一步分割數組。

    2. 最大值所在的下標左區間 構造左子樹

    3. 最大值所在的下標右區間 構造右子樹

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def constructMaximumBinaryTree(self, nums: List[int]) -> TreeNode:
        if len(nums) == 1:
            return TreeNode(nums[0])
        node = TreeNode(0)
        # 找到數組中最大的值和對應的下標
        maxValue = 0
        maxValueIndex = 0
        for i in range(len(nums)):
            if nums[i] > maxValue:
                maxValue = nums[i]
                maxValueIndex = i
        node.val = maxValue
        # 最大值所在的下標左區間 構造左子樹
        if maxValueIndex > 0:
            new_list = nums[:maxValueIndex]
            node.left = self.constructMaximumBinaryTree(new_list)
        # 最大值所在的下標右區間 構造右子樹
        if maxValueIndex < len(nums) - 1:
            new_list = nums[maxValueIndex+1:]
            node.right = self.constructMaximumBinaryTree(new_list)
        return node
        
```

注意類似用數組構造二叉樹的題目，每次分隔盡量不要定義新的數組，而是通過下標索引直接在原數組上操作，這樣可以節約時間和空間上的開銷。

一些同學也會疑惑，什麽時候遞歸函數前面加if，什麽時候不加if，這個問題我在最後也給出了解釋。

其實就是不同代碼風格的實現，一般情況來說：如果讓空節點（空指針）進入遞歸，就不加if，如果不讓空節點進入遞歸，就加if限制一下， 終止條件也會相應的調整。


<div id = "617" style="text-align: center;">
#617, Merge Two Binary Trees
</div>

```
給定兩個二叉樹，想象當你將它們中的一個覆蓋到另一個上時，兩個二叉樹的一些節點便會重疊(相加)。

你需要將他們合並為一個新的二叉樹。合並的規則是如果兩個節點重疊，那麽將他們的值相加作為節點合並後的新值，否則不為 NULL 的節點將直接作為新二叉樹的節點。
```

![](https://camo.githubusercontent.com/539724dbcb5365287700369a7c8c22686d0e87f2e453fc38d9cb18643e8365d5/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f32303233303331303030303835342e706e67)

1. 確定參數及返回值：

首先要合入兩個二叉樹，那麽參數至少是要傳入兩個二叉樹的根節點，返回值就是合並之後二叉樹的根節點。
```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def mergeTrees(t1, t2):
```

2. 確定終止條件：

因為是傳入了兩個樹，那麽就有兩個樹遍歷的節點t1 和 t2，如果t1 == NULL 了，兩個樹合並就應該是 t2 了（如果t2也為NULL也無所謂，合並之後就是NULL）。反過來如果t2 == NULL，那麽兩個數合並就是t1（如果t1也為NULL也無所謂，合並之後就是NULL）。

```python
if t1 is None:
    return t2  
if t2 is None:
    return t1
```

3. 確定單層遞歸的邏輯：

單層遞歸的邏輯就比較好寫了，這里我們重覆利用一下t1這個樹，t1就是合並之後樹的根節點（就是修改了原來樹的結構）。

那麽單層遞歸中，就要把兩棵樹的元素加到一起。

```python
t1.val += t2.val
```

接下來t1 的左子樹是：合並 t1左子樹 t2左子樹之後的左子樹。

t1 的右子樹：是 合並 t1右子樹 t2右子樹之後的右子樹。

最終t1就是合並之後的根節點。

代碼如下：

```python
t1.left = merge_trees(t1.left, t2.left)
t1.right = merge_trees(t1.right, t2.right)
return t1
```

完整版：

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def mergeTrees(self, root1: TreeNode, root2: TreeNode) -> TreeNode:
        # 遞歸終止條件: 
        #  但凡有一個節點為空, 就立刻返回另外一個. 如果另外一個也為None就直接返回None. 
        if not root1: 
            return root2
        if not root2: 
            return root1
        # 上面的遞歸終止條件保證了代碼執行到這里root1, root2都非空. 
        root1.val += root2.val # 中
        root1.left = self.mergeTrees(root1.left, root2.left) #左
        root1.right = self.mergeTrees(root1.right, root2.right) # 右
        
        return root1 # 注意: 本題我們重覆使用了題目給出的節點而不是創建新節點. 節省時間, 空間. 

```


<div id = "700" style="text-align: center;">
#700, Search in a Binary Search Tree
</div>

```
給定二叉搜索樹（BST）的根節點和一個值。 你需要在BST中找到節點值等於給定值的節點。 返回以該節點為根的子樹。 如果節點不存在，則返回 NULL。
```
![](https://camo.githubusercontent.com/cf55fdf9637675b74a15c3d3372691529f3abc26048901ea5f1e01701100783d/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f32303231303230343135353532323437362e706e67)

**二叉搜索樹**是一個有序樹：

若它的左子樹不空，則左子樹上所有結點的值均小於它的根結點的值；
若它的右子樹不空，則右子樹上所有結點的值均大於它的根結點的值；
它的左、右子樹也分別為二叉搜索樹
這就決定了，二叉搜索樹，遞歸遍歷和叠代遍歷和普通二叉樹都不一樣。

本題，其實就是在二叉搜索樹中搜索一個節點。那麽我們來看看應該如何遍歷。

1. 確定參數及返回值

遞歸函數的參數傳入的就是根節點和要搜索的數值，返回的就是以這個搜索數值所在的節點。
```python
def searchBST(root: TreeNode, val: int) -> TreeNode:
```

2. 確定終止條件

如果root為空，或者找到這個數值了，就返回root節點。
```python
if (root == None or root.val == val) return root
```

3. 確定單層遞歸的邏輯

因為二叉搜索樹的節點是有序的，所以可以有方向的去搜索。

如果root.val > val，搜索左子樹，如果root.val < val，就搜索右子樹，最後如果都沒有搜索到，就返回None。

```python
result = None
if root.val > val:
    result = searchBST(root.left, val)
if root.val < val:
    result = searchBST(root.right, val)
return result
```

完整代碼：

```python
class Solution:
    def searchBST(self, root: TreeNode, val: int) -> TreeNode:
        # 為什麽要有返回值: 
        #   因為搜索到目標節點就要立即return，
        #   這樣才是找到節點就返回（搜索某一條邊），如果不加return，就是遍歷整棵樹了。

        if not root or root.val == val: 
            return root

        if root.val > val: 
            return self.searchBST(root.left, val)

        if root.val < val: 
            return self.searchBST(root.right, val)
```

<div id = "98" style="text-align: center;">
#98, Validate Binary Search Tree
</div>

```
給定一個二叉樹，判斷其是否是一個有效的二叉搜索樹。

假設一個二叉搜索樹具有如下特征：

1. 節點的左子樹只包含小於當前節點的數（所有）。
2. 節點的右子樹只包含大於當前節點的數。（所有）
3. 所有左子樹和右子樹自身必須也是二叉搜索樹。
```

![](https://camo.githubusercontent.com/9bbee4cadbad0ade9c46bcf6d6c81493efcdc4419a6640df41c4b04bf775c95e/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f32303233303331303030303735302e706e67)

用中序的話，整個數組就是有序的(排序好的)，如果遍歷過後數組是單調遞增的，他就是二叉搜索數。

中序遍歷是「左 → 根 → 右」，對於二叉搜索樹來說，這樣的遍歷順序自然會生成一個遞增的數列。因此，如果一棵樹的中序遍歷結果是遞增的，那麼這棵樹就是一棵合法的二叉搜索樹。

中序遍歷是按照「左子樹 → 根節點 → 右子樹」的順序來遍歷節點。對於二叉搜索樹來說，這個順序保證了遍歷過程中：

先遍歷左子樹（所有節點都小於根節點）。

然後訪問根節點。

最後遍歷右子樹（所有節點都大於根節點）。

**所以**，最直白的想法就是創一個新的數組。對數進行中序遍歷，如果他有序（遞增），就是二叉搜索數。

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        inorder = []
        
        def inorder_traversal(node):
            if not node:
                return
            inorder_traversal(node.left)   # 遍歷左子樹
            inorder.append(node.val)       # 訪問根節點
            inorder_traversal(node.right)  # 遍歷右子樹
        
        # 中序遍歷生成節點的值
        inorder_traversal(root)
        
        # 檢查中序遍歷結果是否為遞增
        for i in range(1, len(inorder)):
            if inorder[i] <= inorder[i - 1]:
                return False
        return True
```

能不能不使用數組？

```python
class Solution:
    def __init__(self):
        self.maxVal = float('-inf') 

    def isValidBST(self, root):
        if root is None:
            return True

        left = self.isValidBST(root.left)
        if self.maxVal < root.val:
            self.maxVal = root.val
        else:
            return False
        right = self.isValidBST(root.right)

        return left and right
```

如果當前節點的值大於 maxVal，則更新 maxVal 為當前節點值，表示此節點是目前遇到的最大值。
如果當前節點的值小於或等於 maxVal，則違反了二叉搜索樹的性質（因為中序遍歷結果應該是單調遞增的），所以返回 False。

<div id = "530" style="text-align: center;">
#530, Minimum Absolute Difference in BST
</div>

```
給你一棵所有節點為非負值的二叉搜索樹，請你計算樹中任意相鄰兩節點的差的絕對值的最小值。
```

![](https://camo.githubusercontent.com/26f8103eacf60eae5c7bf34dc251ff7fd68434a0466ac124b2463867d25fd25a/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f32303230313031343232333430303132332e706e67)

注意是二元搜尋樹，二元搜尋樹可是有序的。

遇到在二元搜尋樹上求什麼最值啊，差值之類的，就把它想成在一個有序數組上求最值，求差值，這樣就簡單多了。

**那麼二元搜尋樹採用中序遍歷，其實就是一個有序數組。**

遇到在二元搜尋樹上求什麼最值，求差值之類的，都要思考一下二元搜尋樹可是有序的，要利用好這一特點。

```python
class Solution:
    def __init__(self):
        self.vec = []

    def traversal(self, root):
        if root is None:
            return
        self.traversal(root.left)
        self.vec.append(root.val)  # 二叉搜索樹轉換為序陣列
        self.traversal(root.right)

    def getMinimumDifference(self, root):
        self.vec = []
        self.traversal(root)
        if len(self.vec) < 2:
            return 0
        result = float('inf')
        for i in range(1, len(self.vec)):
            # 統計有陣列的最小差值
            result = min(result, self.vec[i] - self.vec[i - 1])
        return result
```
使用雙指針來避免額外分配數組，我們可以在中序遍歷的同時計算最小差值，而不是先構造一個有序數組。

```python
class Solution:
    def __init__(self):
        self.prev = None  # 保存上一個節點的值
        self.min_diff = float('inf')  # 保存最小差值

    def traversal(self, root):
        if root is None:
            return
        # 遍歷左子樹
        self.traversal(root.left)
        # 處理當前節點
        if self.prev is not None:  # 如果 prev 不為 None，計算當前節點與前一節點的差值(prev是樹的下層，因為是中序)
            self.min_diff = min(self.min_diff, root.val - self.prev)
        self.prev = root.val  # 更新 prev 為當前節點的值
        # 遍歷右子樹
        self.traversal(root.right)

    def getMinimumDifference(self, root):
        self.prev = None  # 初始化 prev
        self.min_diff = float('inf')  # 初始化最小差值
        self.traversal(root)  # 中序遍歷
        return self.min_diff
```

<div id = "501" style="text-align: center;">
#501, Find Mode in Binary Search Tree
</div>

```
給定一個有相同值的二元搜尋樹（BST），找出 BST 中的所有眾數（出現頻率最高的元素）。

假定 BST 有如下定義：

結點左子樹所含結點的值小於等於目前結點的值
結點右子樹所含結點的值大於等於目前結點的值
左子樹和右子樹都是二元搜尋樹
```

![](https://camo.githubusercontent.com/d8b36a74c1f8c5f1c8d40c3f94c06cea69e486ff9d8328567ff5b0a796a8489c/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f32303230313031343232313533323230362e706e67)

如果不是二元搜尋樹，最直觀的方法一定是把這個樹都遍歷了，用map統計頻率，把頻率排個序，最後取前面高頻的元素的集合。

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
from collections import defaultdict

class Solution:
    def searchBST(self, cur, freq_map):
        if cur is None:
            return
        freq_map[cur.val] += 1  # 统计元素频率
        self.searchBST(cur.left, freq_map)
        self.searchBST(cur.right, freq_map)

    def findMode(self, root):
        freq_map = defaultdict(int)  # key:元素，value:出现频率
        result = []
        if root is None:
            return result
        self.searchBST(root, freq_map)
        max_freq = max(freq_map.values())
        for key, freq in freq_map.items():
            if freq == max_freq:
                result.append(key)
        return result

```

但既然是搜尋樹，它中序遍歷就是有順序的。我們可以利用這一個原理使用雙指針方法來解，目的是為了減少一次遍歷（原本是兩次）。

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:

    def traversal(self,root):
        if root is None:
            return
        self.traversal(root.left)

        if self.prev is None:
            self.count = 1
        elif self.prev != root.val:
            self.count = 1
        elif self.prev == root.val:
            self.count += 1
        self.prev = root.val

        if self.count > self.maxcount:
            self.maxcount = self.count
            self.result = []  # 很关键的一步，不要忘记清空result，之前result里的元素都失效了           
            self.result.append(root.val)
        elif self.count == self.maxcount:
            self.result.append(root.val)
        self.traversal(root.right)
        
    def findMode(self, root: Optional[TreeNode]) -> List[int]:
        self.count = 0
        self.maxcount = 0
        self.prev = None  # 记录前一个节点
        self.result = []

        self.traversal(root)
        return self.result
        
```


<div id = "236" style="text-align: center;">
#236, Lowest Common Ancestor of a Binary Tree
</div>

```
給定一個二元樹, 找到該樹中兩個指定節點的最近公共祖先。

百度百科中最近公共祖先的定義為：「對於有根樹T 的兩個結點p、q，最近公共祖先表示為一個結點x，滿足x 是p、q 的祖先且x 的深度盡可能大（一個節點也可以是它自己的祖先）。

例如，給定如下二元樹: root = [3,5,1,6,2,0,8,null,null,7,4]
```
![](https://assets.leetcode.com/uploads/2018/12/14/binarytree.png)
```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.

Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.
```

**如何從下向上遍歷？**

在二叉樹中是沒辦法向上遍歷的，但是處理順序是可以的！

以上面為例，假設7，4分別是p,q. 2是LCA。就代表2擁有7與4這兩個子樹。

注意看，是不是左、右、中。後序遍歷！

在這個解法中，遞迴的過程實際上是先遞迴進行 深度優先搜尋（DFS），然後才進行回溯，這就是所謂的後序遍歷（Post-order Traversal）。

**!!!**

前序遍歷:
用於複製二元樹。
用於計算樹的某些特定數值（如樹的節點數量）。

中序：
常用於排序問題，因為對於一棵二元搜索樹（BST），中序遍歷會得到一個有序的節點列表。
用於檢查二元樹是否是二元搜索樹。

後序(需要由下往上的題目)：
用於刪除二元樹中的節點。
用於計算樹的深度或高度。
用於計算樹的總和、樹的最大最小值等。

```Python
class Solution:
    def lowestCommonAncestor(self, root, p, q):
        # 如果當前節點是 p 或 q，或者當前節點是空，則返回當前節點（終止條件）
        if root == q or root == p or root is None:
            return root

        # 遞迴搜尋左子樹
        left = self.lowestCommonAncestor(root.left, p, q)

        # 遞迴搜尋右子樹
        right = self.lowestCommonAncestor(root.right, p, q)

        # 如果左子樹和右子樹都找到了 p 或 q，那麼當前節點是最近公共祖先
        if left is not None and right is not None:
            return root

        # 如果左子樹為 None（當某一子樹沒有包含目標節點 p 或 q 時，該子樹的結果將會是 None。），但右子樹找到了 p 或 q，則返回右子樹的結果
        if left is None and right is not None:
            return right
        
        # 如果右子樹為 None，但左子樹找到了 p 或 q，則返回左子樹的結果
        elif left is not None and right is None:
            return left
        
        # 如果左右子樹都為 None，表示未找到 p 或 q，返回 None
        else: 
            return None

```

**To be continued...**