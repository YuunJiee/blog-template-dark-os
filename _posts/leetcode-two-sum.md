---
title: "LeetCode 1: Two Sum"
date: '2026-11-15'
updated: '2026-11-15'
draft: false
type: leetcode
difficulty: Easy
leetcode_id: 1
plan: Top Interview 150
tags:
  - LeetCode
  - Array
  - Hash Table
summary: LeetCode 題解範例。用雜湊表記錄看過的數字，一次走訪 O(n) 找到答案。
---

`type: leetcode` 的文章會出現在 `/leetcode`，而不是 `/blog`，並依 `difficulty` 上色。

## 題目

題目連結：[LeetCode 1. Two Sum](https://leetcode.com/problems/two-sum/)

給定整數陣列 `nums` 和目標值 `target`，回傳兩個加起來等於 `target` 的數字的索引。

## 解法：雜湊表

走訪陣列時，把看過的數字和索引存進雜湊表。每遇到一個數字 `x`，就查 `target - x` 是否出現過。

```python
class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, x in enumerate(nums):
            if target - x in seen:
                return [seen[target - x], i]
            seen[x] = i
        return []
```

## 複雜度

- 時間：$O(n)$
- 空間：$O(n)$
