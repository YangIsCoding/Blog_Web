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

## 性能分析:

大O用來表示上界的，當用它作為演算法的最壞情況運行時間的上界，就是對任意資料輸入的運行時間的上界。

## 數組:
<h1 class="circle-title">二分搜尋</h1>

<div id = "704" style="text-align: center;">
#704, Binary Search
</div>

```
给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target ，
写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

输入: nums = [-1,0,3,5,9,12], target = 9     
输出: 4       
解释: 9 出现在 nums 中并且下标为 4     
```

二分查找涉及的很多的邊界條件，邏輯比較簡單，但就是寫不好。例如到底是 WHILE(LEFT < RIGHT) 還 是 WHILE(LEFT <= RIGHT)，到底是RIGHT = MIDDLE呢，還是要RIGHT = MIDDLE - 1呢?

寫二分法，區間的定義一般為兩種，左閉右閉即[LEFT, RIGHT]，或左閉右開即[LEFT, RIGHT)。

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

有如下两點：

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
                return middle # 數组中找到目標值，直接返回下標
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

1. 快指针:寻找新数组的元素 ，新数组就是不含有目标元素的数组

2. 慢指针:指向更新 新数组下标的位置

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
给你一个按 非递减顺序 排序的整数数组 NUMS，返回 每个数字的平方 组成的新数组，要求也按 非递减顺 序 排序。
示例 1:
1. 输入:NUMS = [-4,-1,0,3,10]
2. 输出:[0,1,9,16,100]
3. 解释:平方后，数组变为 [16,1,0,9,100]，排序后，数组变为 [0,1,9,16,100]
```

数组其实是有序的， 只不过负数平方之后可能成为最大数了。 那么数组平方的最大值就在数组的两端，不是最左边就是最右边，不可能是中间。 此时可以考虑双指针法了，I指向起始位置，J指向终止位置。 定义一个新数组RESULT，和A数组一样的大小，让K指向RESULT数组终止位置。

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
给定一个含有 N 个正整数的数组和一个正整数 S ，找出该数组中满足其和 ≥ S 的⻓度最小的 连续 子数组， 并返回其⻓度。如果不存在符合条件的子数组，返回 0。

示例:
1. 输入:S = 7, NUMS = [2,3,1,2,4,3]
2. 输出:2
3. 解释:子数组 [4,3] 是该条件下的⻓度最小的子数组。
```

首先要思考 如果用一个FOR循环，那么应该表示 滑动窗口的起始位置，还是终止位置。 如果只用一个FOR循环来表示 滑动窗口的起始位置，那么如何遍历剩下的终止位置? 此时难免再次陷入 暴力解法的怪圈。
所以 只用一个FOR循环，那么这个循环的索引，一定是表示 滑动窗口的终止位置

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
给定一个正整数 N，生成一个包含 1 到 N^2 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。 示例:
输入: 3 输出: [ [ 1, 2, 3 ], [ 8, 9, 4 ], [ 7, 6, 5 ] ]

一定要坚持循环不变量原则。 而求解本题依然是要坚持循环不变量原则。 模拟顺时针画矩阵的过程:

1. 填充上行从左到右 
2. 填充右列从上到下 
3. 填充下行从右到左 
4. 填充左列从下到上
```

由外向内一圈一圈这么画下去。 可以发现这里的边界条件非常多，在一个循环中，如此多的边界条件，如果不按照固定规则来遍历，那就是一 进循环深似海，从此OFFER是路人。 这里一圈下来，我们要画每四条边，这四条边怎么画，每画一条边都要坚持一致的左闭右开，或者左开右闭的 原则，这样这一圈才能按照统一的规则画下来。

```python
from typing import List
class Solution:
    def generateMatrix(self, n: int) -> List[List[int]]:
    # 初始化 n x n 矩阵
    matrix = [[0] * n for _ in range(n)]
    num = 1
    left, right, top, bottom = 0, n - 1, 0, n - 1
    while left <= right and top <= bottom:
        # 从左到右填充顶行
        for i in range(left, right + 1):#left 到 right 表示当前顶行从左到右的范围，包括
            right，因此使用 right + 1。
            matrix[top][i] = num
            num += 1
            top += 1# 填充完顶行，顶行边界下移

        # 从上到下填充右列
        for i in range(top, bottom + 1):#top 到 bottom 表示当前右列从上到下的范围，包括 bottom，因此使用 bottom + 1。
            matrix[i][right] = num
            num += 1
            right -= 1# 填充完右列，右列边界左移

        if top <= bottom:
            # 从右到左填充底行
            for i in range(right, left - 1, -1):
                matrix[bottom][i] = num
                num += 1 bottom -= 1

        if left <= right:
            # 从下到上填充左列
            for i in range(bottom, top - 1, -1):
                matrix[i][left] = num
                num += 1 left += 1
    return matrix
```

為什只有# 从右到左填充底行 # 从下到上填充左列 需要特別檢查?

只有从右到左填充底行和从下到上填充左列需要特别检查，是因为在这些步骤之前已经改变了 TOP 和 RIGHT 边界，这可能导致这些边界条件在某些情况下已经不再满足。例如，当矩阵中只剩下一行或一列需要填充时，更新后的 TOP 或 RIGHT 可能会越过 BOTTOM 或 LEFT 边界，导致不再需要执行这些步骤。

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
题意:删除链表中等于给定值 VAL 的所有节点。
示例 :
1. 输入:HEAD = [1,2,6,3,4,5,6], VAL = 6 输出:[1,2,3,4,5]
2. 输入:HEAD = [], VAL = 1 输出:[]
3. 输入:HEAD = [7,7,7,7], VAL = 7 输出:[]
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

如果在你的代码中直接返回 HEAD 而不是 DUMMY.NEXT，那么会存在以下问题:

1. 未处理头节点的情况:如果需要删除的节点正是链表的头节点(即 HEAD 本身)，在删除操作后， HEAD 仍然指向原来的头节点，这样返回的链表仍然包含需要删除的头节点。

2. 未更新链表头部:使用虚拟头节点(DUMMY NODE)的目的是为了简化删除操作，特别是当头节点 需要被删除时。如果你在删除操作后直接返回 HEAD，就无法处理这种情况。

<div id = "707" style="text-align: center;">
#707, Design Linked List
</div>

```
在链表类中实现这些功能:
1. GET(INDEX):获取链表中第 INDEX 个节点的值。如果索引无效，则返回-1。
2.  ADDATHEAD(VAL):在链表的第一个元素之前添加一个值为 VAL 的节点。插入后，新节点将成为链表 的第一个节点。
3. ADDATTAIL(VAL):将值为 VAL 的节点追加到链表的最后一个元素。
4. ADDATINDEX(INDEX,VAL):在链表中的第 INDEX 个节点之前添加值为 VAL 的节点。如果 INDEX 等
于链表的⻓度，则该节点将附加到链表的末尾。如果 INDEX 大于链表⻓度，则不会插入节点。如果
INDEX小于0，则在头部插入节点。
5. DELETEATINDEX(INDEX):如果索引 INDEX 有效，则删除链表中的第 INDEX 个节点。
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
给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

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
        prev.next = self.swapPairs(next) # 将以next为head的后续
        return cur
```

Iterative:

```python
class Solution:
    def swapPairs(self, head: Optional[ListNode]) ->Optional[ListNode]:
    dummyHead = ListNode(0) # 设置一个虚拟头结点面做删除操作
    dummyHead.next = head # 将虚拟头结点指向head，这样方便后
    cur = dummyHead
    while cur.next and cur.next.next:
        tmp1 = cur.next # 记录临时节点
        tmp2 = cur.next.next.next # 记录临时节点

        cur.next = cur.next.next # 步骤一
        cur.next.next = tmp1 # 步骤二
        cur.next.next.next = tmp2 # 步骤三

        cur = cur.next.next # cur移动两位，准备下一轮交换 return dummyHead.next
    return dummyHead.next
```
![描述文字](https://camo.githubusercontent.com/01651992af843c28fd7496e6a04cc4e83760a7ceead3d8da46e4c1acb35b02bc/68747470733a2f2f636f64652d7468696e6b696e672e63646e2e626365626f732e636f6d2f706963732f32342e254534254238254134254534254238254134254534254241254134254536253844254132254539253933254245254538254131254138254534254238254144254537253941253834254538253841253832254537253832254239312e706e67)

<div id = "19" style="text-align: center;">
#19, Remove Nth Node From End of List
</div>

```
给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

输入：head = [1,2,3,4,5], n = 2 输出：[1,2,3,5]


输入：head = [1], n = 1 输出：[]


输入：head = [1,2], n = 1 输出：[1]
```

双指针的经典应用，如果要删除倒数第n个节点，让fast移动n步，然后让fast和slow同时移动，直到fast指向链表末尾。删掉slow所指向的节点就可以了。

思路是这样的，但要注意一些细节。

1. 首先这里我推荐大家使用虚拟头结点，这样方便处理删除实际头结点的逻辑。

2. 定义fast指针和slow指针，初始值为虚拟头结点

3. fast首先走n + 1步 ，为什么是n+1呢，因为只有这样同时移动的时候slow才能指向删除节点的上一个节点（方便做删除操作

4. fast和slow同时移动，直到fast指向末尾(Null)

5. 删除slow指向的下一个节点

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
给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 null 。
```

![](https://camo.githubusercontent.com/f5e894bff106380c6648d69ea08217bfe793eb925e37f36663db2903e84ec10e/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f32303231313231393232313732332e706e67)

简单来说，就是求两个链表交点节点的指针。 这里同学们要注意，交点不是数值相等，而是指针相等。

为了方便举例，假设节点元素数值相等，则节点指针相等。

看如下两个链表，目前curA指向链表A的头结点，curB指向链表B的头结点：

![](https://camo.githubusercontent.com/c6d77070c788bb9aba8c74b7b3c1f649797a0cfe2843f1fe91050e208b642f07/68747470733a2f2f636f64652d7468696e6b696e672e63646e2e626365626f732e636f6d2f706963732f25453925394425413225453825414625393525453925413225393830322e30372e2545392539332542452545382541312541382545372539422542382545342542412541345f312e706e67)

我们求出两个链表的长度，并求出两个链表长度的差值，然后让curA移动到，和curB 末尾对齐的位置，如图：

![](https://camo.githubusercontent.com/f50f6cd03839a7f7f1d443129261f1fe36e297ae5381c1d2395e9d9c732c55d9/68747470733a2f2f636f64652d7468696e6b696e672e63646e2e626365626f732e636f6d2f706963732f25453925394425413225453825414625393525453925413225393830322e30372e2545392539332542452545382541312541382545372539422542382545342542412541345f322e706e67)

此时我们就可以比较curA和curB是否相同，如果不相同，同时向后移动curA和curB，如果遇到curA == curB，则找到交点。

```python
class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> ListNode:
        lenA, lenB = 0, 0
        cur = headA
        while cur:         # 求链表A的长度
            cur = cur.next 
            lenA += 1
        cur = headB 
        while cur:         # 求链表B的长度
            cur = cur.next 
            lenB += 1
        curA, curB = headA, headB
        if lenA < lenB:     # 让curA为最长链表的头，lenB为其长度
            curA, curB = curB, curA
            lenA, lenB = lenB, lenA 
        for _ in range(lenA - lenB):  # 让curA和curB在同一起点上（末尾位置对齐）
            curA = curA.next 
        while curB:         #  遍历curA 和 curB，遇到相同则直接返回
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
题意： 给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
```

为了表示给定链表中的环，使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。


![](https://camo.githubusercontent.com/b364f73596cb946f8cef38dcecf559f6abad44a5d45c5f2e58802abec84bd46a/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f32303232303932353130333433332e706e67)

那么相遇时： slow指针走过的节点数为: x + y， fast指针走过的节点数： x + y + n (z + y)，n为fast指针在环内走了n圈才遇到slow指针， （y+z）为 一圈内节点的个数A。

因为fast指针是一步走两个节点，slow指针一步走一个节点， 所以 fast指针走过的节点数 = slow指针走过的节点数 * 2：

(x + y) * 2 = x + y + n (y + z)

两边消掉一个（x+y）: x + y  = n (y + z) 

因为要找环形的入口，那么要求的是x，因为x表示 头结点到 环形入口节点的的距离。

所以要求x ，将x单独放在左面：x = n (y + z) - y ,

这个公式说明什么呢？

先拿n为1的情况来举例，意味着fast指针在环形里转了一圈之后，就遇到了 slow指针了。

当 n为1的时候，公式就化解为 x = z，

这就意味着，从头结点出发一个指针，从相遇节点 也出发一个指针，这两个指针每次只走一个节点， 那么当这两个指针相遇的时候就是 环形入口的节点。

也就是在相遇节点处，定义一个指针index1，在头结点处定一个指针index2。

让index1和index2同时移动，每次移动一个节点， 那么他们相遇的地方就是 环形入口的节点。

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

一般哈希表都是用来快速判断一个元素是否出现集合里。要枚举的话时间复杂度是O(n)，但如果使用哈希表的话， 只需要O(1)就可以做到。

哈希函数，把学生的姓名直接映射为哈希表上的索引，然后就可以通过查询索引下标快速知道这位同学是否在这所学校里了。

哈希函数，通过hashCode把名字转化为数值，一般hashcode是通过特定编码方式，可以将其他数据格式转化为不同的数值，这样就把学生名字映射为哈希表上的索引数字了。

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
给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

示例 1: 输入: s = "anagram", t = "nagaram" 输出: true

示例 2: 输入: s = "rat", t = "car" 输出: false

说明: 你可以假设字符串只包含小写字母。
```

```python
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        record = [0] * 26
        for i in s:
            #并不需要记住字符a的ASCII，只要求出一个相对数值就可以了
            record[ord(i) - ord("a")] += 1
        for i in t:
            record[ord(i) - ord("a")] -= 1
        for i in range(26):
            if record[i] != 0:
                #record数组如果有的元素不为零0，说明字符串s和t 一定是谁多了字符或者谁少了字符。
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
给你一个字符串数组 words ，请你找出所有在 words 的每个字符串中都出现的共用字符（ 包括重复字符），并以数组形式返回。你可以按 任意顺序 返回答案。

示例 1：

输入：words = ["bella","label","roller"] 输出：["e","l","l"]

示例 2：

输入：words = ["cool","lock","cook"] 输出：["c","o"]

提示：

1 <= words.length <= 100 1 <= words[i].length <= 100 words[i] 由小写英文字母组成
```

![](https://camo.githubusercontent.com/005ce8412d380d9aa3ba005eafc914e90da50358dccc382740f81dafa9601160/68747470733a2f2f636f64652d7468696e6b696e672e63646e2e626365626f732e636f6d2f706963732f313030322e2545362539462541352545362538392542452545352542382542382545372539342541382545352541442539372545372541432541362e706e67)

```python
class Solution:
    def commonChars(self, words: List[str]) -> List[str]:
        if not words: 
            return []

        result = []
        hash = [0] * 26  # 用来统计所有字符串里字符出现的最小频率
        
        # 用第一个字符串给hash初始化
        for c in words[0]:  
            hash[ord(c) - ord('a')] += 1
        
        # 统计除第一个字符串外字符的出现频率
        for i in range(1, len(words)):
            hashOtherStr = [0] * 26
            for j in range(len(words[i])):
                hashOtherStr[ord(words[i][j]) - ord('a')] += 1

            # 更新hash，保证hash里统计26个字符在所有字符串里出现的最小次数
            for k in range(26):
                hash[k] = min(hash[k], hashOtherStr[k])
        
        # 将hash统计的字符次数，转成输出形式
        for i in range(26):
            while hash[i] != 0:  # 注意这里是while，多个重复的字符
                result.append(chr(i + ord('a')))
                hash[i] -= 1
        
        return result
```

时间复杂度：
𝑂
(
𝑊
⋅
𝐿
)
O(W⋅L)，其中 
𝑊
W 是字符串数组的长度，
𝐿
L 是字符串数组中最长字符串的长度。
空间复杂度：
𝑂
(
𝐿
)
O(L)，其中 
𝐿
L 是字符串数组中最长字符串的长度。

<div id = "349" style="text-align: center;">
#349, Intersection of Two Arrays
</div>

```
题意：给定两个数组，编写一个函数来计算它们的交集。you may return the result in any order.

Input: nums1 = [1,2,2,1], nums2 = [2,2]

Output: [2]

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]

Output: [9,4]

Explanation: [4,9] is also accepted.
```

```python
class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
    # 使用哈希表存储一个数组中的所有元素
        table = {}
        for num in nums1:
            table[num] = table.get(num, 0) + 1
        
        # 使用集合存储结果
        res = set()
        for num in nums2:
            if num in table:
                res.add(num)
                del table[num]
        
        return list(res)
```

**為什麼這一題要用兩種資料結構解題？**

哈希表的作用：

存储 nums1 的元素：
我们使用哈希表 table 来存储 nums1 中的所有元素，并记录每个元素出现的次数。
使用哈希表的优点是查找和插入操作的平均时间复杂度都是 
𝑂
(
1
)
O(1)。
具体地，对于每个 nums1 中的元素，我们将其作为哈希表的键，并将其值初始化为1（即便多次出现也不影响，因为我们只关心是否存在）

集合的作用：

存储交集结果：我们使用集合 res 来存储交集结果。
使用集合的优点是它只存储唯一元素，自动去重。

<div id = "202" style="text-align: center;">
#202, Happy Number
</div>

```
「快乐数」定义为：对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和，然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。如果 可以变为  1，那么这个数就是快乐数。

输入：19

输出：true

解释：

1^2 + 9^2 = 82

8^2 + 2^2 = 68

6^2 + 8^2 = 100

1^2 + 0^2 + 0^2 = 1
```

这道题目看上去貌似一道数学问题，其实并不是！

题目中说了会 无限循环，那么也就是说求和的过程中，sum会重复出现，这对解题很重要！当我们遇到了要快速判断一个元素是否出现集合里的时候，就要考虑哈希法了。

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
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

示例:

给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9

所以返回 [0, 1]
```

本题其实有四个重点：

1. 为什么会想到用哈希表
2. 哈希表为什么用map
3. 本题map是用来存什么的
4. map中的key和value用来存什么的

首先我再强调一下 什么时候使用哈希法，当我们需要查询一个元素是否出现过，或者一个元素是否在集合里的时候，就要第一时间想到哈希法。

本题呢，我就需要一个集合来存放我们遍历过的元素，然后在遍历数组的时候去询问这个集合，某元素是否遍历过，也就是 是否出现在这个集合。

那么我们就应该想到使用哈希法了。

因为本题，我们不仅要知道元素有没有遍历过，还要知道这个元素对应的下标，需要使用 key value结构来存放，key来存元素，value来存下标，那么使用map正合适。

再来看一下使用数组和set来做哈希法的局限。

数组的大小是受限制的，而且如果元素很少，而哈希值太大会造成内存空间的浪费。

set是一个集合，里面放的元素只能是一个key，而两数之和这道题目，不仅要判断y是否存在而且还要记录y的下标位置，因为要返回x 和 y的下标。所以set 也不能用。

此时就要选择另一种数据结构：map ，map是一种key value的存储结构，可以用key保存数值，用value再保存数值所在的下标。

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        
        Haveseen = {}  # 初始化一个空的哈希表
        
        for i, value in enumerate(nums):  # 枚举nums数组，i是索引，value是对应的元素
            if target - value in Haveseen:  # 检查当前元素的补数是否在哈希表中
                return [Haveseen[target - value], i]  # 如果找到了补数，返回补数的索引和当前索引
            else:
                Haveseen[value] = i  # 如果没有找到补数，把当前元素存入哈希表，键是元素值，值是索引
```

**enumerate() 函数用于将一个可遍历的数据对象(如列表、元组或字符串)组合为一个索引序列，同时列出数据和数据下标，一般用在for 循环当中。**

當然也可以先把題幹做排序，用雙指針（但是會由O(n)變成O(nlogn)）

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # 对输入列表进行排序
        nums_sorted = sorted(nums)
        
        # 使用双指针
        left = 0
        right = len(nums_sorted) - 1
        while left < right:
            current_sum = nums_sorted[left] + nums_sorted[right]
            if current_sum == target:
                # 如果和等于目标数，则返回两个数的下标
                left_index = nums.index(nums_sorted[left])
                right_index = nums.index(nums_sorted[right])
                if left_index == right_index:
                    right_index = nums[left_index+1:].index(nums_sorted[right]) + left_index + 1
                return [left_index, right_index]
            elif current_sum < target:
                # 如果总和小于目标，则将左侧指针向右移动
                left += 1
            else:
                # 如果总和大于目标值，则将右指针向左移动
                right -= 1
```



![](https://camo.githubusercontent.com/7c9fdc5c90edbd8498ac963e8ca830cdd848921ef303d84dbdcf2092cf39e1cb/68747470733a2f2f636f64652d7468696e6b696e672d313235333835353039332e66696c652e6d7971636c6f75642e636f6d2f706963732f32303232303731313230323633382e706e67)

<div id = "454" style="text-align: center;">
#454, 4 Sum 2
</div>

```
给定四个包含整数的数组列表 A , B , C , D ,计算有多少个元组 (i, j, k, l) ，使得 A[i] + B[j] + C[k] + D[l] = 0。

为了使问题简单化，所有的 A, B, C, D 具有相同的长度 N，且 0 ≤ N ≤ 500 。所有整数的范围在 -2^28 到 2^28 - 1 之间，最终结果不会超过 2^31 - 1 。

例如:

输入:

A = [ 1, 2]
B = [-2,-1]
C = [-1, 2]
D = [ 0, 2]

输出:

2

解释:

两个元组如下:

(0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0

(1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0
```

本题乍眼一看好像和0015.三数之和，0018.四数之和差不多，其实差很多。

本题是使用哈希法的经典题目，而0015.三数之和，0018.四数之和并不合适使用哈希法，因为三数之和和四数之和这两道题目使用哈希法在不超时的情况下做到对结果去重是很困难的，很有多细节需要处理。

而这道题目是四个独立的数组，只要找到A[i] + B[j] + C[k] + D[l] = 0就可以，不用考虑有重复的四个元素相加等于0的情况，所以相对于题目18. 四数之和，题目15.三数之和，还是简单了不少！

```python
class Solution(object):
    def fourSumCount(self, nums1, nums2, nums3, nums4):
        # 使用字典存储nums1和nums2中的元素及其和
        hashmap = {}
        for n1 in nums1:
            for n2 in nums2:
                hashmap[n1+n2] = hashmap.get(n1+n2, 0) + 1
        
        # 如果 -(n1+n2) 存在于nums3和nums4, 存入结果, 
        # 試想，當hashmap裡面已經有2了，這時候n3+n4出現一個 -2, 只要將-2變為2（取負數），如果存在在hashmap中，就知道他們相加==0。
        count = 0
        for n3 in nums3:
            for n4 in nums4:
                key = - n3 - n4
                if key in hashmap:
                    count += hashmap[key]
        return count
```

时间复杂度: O(n^2)

空间复杂度: O(n^2)


<div id = "383"style="text-align: center;">
#383, Ransom Note
</div>

```
给定一个赎金信 (ransom) 字符串和一个杂志(magazine)字符串，**判断第一个字符串 ransom 能不能由第二个字符串 magazines 里面的字符构成。如果可以构成，返回 true ；否则返回 false。**

(题目说明：为了不暴露赎金信字迹，要从杂志上搜索各个需要的字母，组成单词来表达意思。杂志字符串中的每个字符只能在赎金信字符串中使用一次。)

注意：

你可以假设两个字符串均只含有小写字母。

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

**all 函数会对生成器表达式中的每个元素进行求值，只要所有元素都为 True，它就返回 True，否则返回 False。**

**生成器表达式 ransom_count[i] <= magazine_count[i] for i in range(26) 会遍历从 0 到 25 的所有索引（对应字母 a 到 z），并检查 ransom_count 中每个索引 i 的值是否小于或等于 magazine_count 中对应的值**

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

注意： 答案中不可以包含重複的三元组。

示例：

给定數组 nums = [-1, 0, 1, 2, -1, -4]，

滿足要求的三元组集合：[ [-1, 0, 1], [-1, -1, 2] ]
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
            # 排序之后如果第一個元素已經大於零，不可能凑成三元组
            if nums[i] > 0:
                break
            if i > 0 and nums[i] == nums[i - 1]:  # 三元组元素a去重
                continue
            s = set()
            for j in range(i + 1, len(nums)):
                if j > i + 2 and nums[j] == nums[j - 1] and nums[j - 1] == nums[j - 2]:  # 三元组元素b去重
                    continue
                c = - (nums[i] + nums[j])
                if c in s:
                    result.append([nums[i], nums[j], c])
                    s.remove(c)  # 三元组元素c去重
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
            # 如果第一个元素已经大于0，不需要进一步检查
            if nums[i] > 0:
                return result
            
            # 跳过相同的元素以避免重复
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
                    
                    # 跳过相同的元素以避免重复
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
题意：给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。

注意：

答案中不可以包含重复的四元组。

示例： 给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。 
满足要求的四元组集合为： [ [-1, 0, 0, 1], [-2, -1, 1, 2], [-2, 0, 0, 2] ]
```

四数之和，和15.三数之和是一个思路，都是使用双指针法, 基本解法就是在15.三数之和 的基础上再套一层for循环。

但是有一些细节需要注意，例如： 不要判断nums[k] > target 就返回了，三数之和 可以通过 nums[i] > 0 就返回了，因为 0 已经是确定的数了，四数之和这道题目 target是任意值。比如：数组是[-4, -3, -2, -1]，target是-10，不能因为-4 > -10而跳过。但是我们依旧可以去做剪枝，逻辑变成nums[i] > target && (nums[i] >=0 || target >= 0)就可以了。

四数之和的双指针解法是两层for循环nums[k] + nums[i]为确定值，依然是循环内有left和right下标作为双指针，找出nums[k] + nums[i] + nums[left] + nums[right] == target的情况，三数之和的时间复杂度是O(n^2)，四数之和的时间复杂度是O(n^3) 。

那么一样的道理，五数之和、六数之和等等都采用这种解法。

对于15.三数之和双指针法就是将原本暴力O(n^3)的解法，降为O(n^2)的解法，四数之和的双指针解法就是将原本暴力O(n^4)的解法，降为O(n^3)的解法。

之前我们讲过哈希表的经典题目：454.四数相加II，相对于本题简单很多，因为本题是要求在一个集合中找出四个数相加等于target，同时四元组不能重复。

双指针法将时间复杂度：O(n^2)的解法优化为 O(n)的解法。也就是降一个数量级，题目如下：

1. 27.移除元素
2. 15.三数之和
3. 18.四数之和

```python
def four_sum(nums, target):
    nums.sort()  # 对数组进行排序
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
                    # 跳过重复元素
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

四指针法（双指针法）：

排序：时间复杂度是 
𝑂
(
𝑛
log
⁡
𝑛
)


四重循环：第一层循环是 
𝑂
(
𝑛
)
，第二层循环是 
𝑂
(
𝑛
)
，内层双指针循环的复杂度是 
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

四数之和问题的算法实现中使用的四指针法（实际上是两层循环加双指针法）是比较高效的方法之一，但它的时间复杂度是 
𝑂
(
𝑛
3
)
O(n 
3
 )，这并不是最快的理论时间复杂度，但是对于实际应用来说，这个算法的性能通常是足够的。

对于此类问题，最理想的时间复杂度可能是 
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
 )，通过使用哈希表来进一步优化查找过程。但是，这样的优化往往在实际实现中会遇到诸如管理和维护复杂的数据结构、处理更复杂的去重逻辑等挑战。

 ```python
 def four_sum_hash(nums, target):
    from collections import defaultdict
    num_dict = defaultdict(list)
    results = set()
    nums.sort()
    n = len(nums)
    
    # 存储所有可能的两数和
    for i in range(n):
        for j in range(i + 1, n):
            num_dict[nums[i] + nums[j]].append((i, j))
    
    # 查找四个不同索引的元素，其和为 target
    for key in num_dict:
        complement = target - key
        if complement in num_dict:
            for first_pair in num_dict[key]:
                for second_pair in num_dict[complement]:
                    index_set = set(first_pair + second_pair)
                    # 确保四个索引不重复
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
编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。

不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

你可以假设数组中的所有字符都是 ASCII 码表中的可打印字符。

示例 1：
输入：["h","e","l","l","o"]
输出：["o","l","l","e","h"]

示例 2：
输入：["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]
```

two pointers:
```python
class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        left, right = 0, len(s) - 1
        
        # 该方法已经不需要判断奇偶数，经测试后时间空间复杂度比用 for i in range(len(s)//2)更低
        # 因为while每次循环需要进行条件判断，而range函数不需要，直接生成数字，因此时间复杂度更低。推荐使用range
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
        # 原地反转,无返回值
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




**To be continued...**