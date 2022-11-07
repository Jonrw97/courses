
class DoubleLinkedListNode(object):

    def __init__(self, value, nxt, prev):
        self.value = value
        self.next = nxt
        self.prev = prev

    def __repr__(self):
        nval = self.next and self.next.value or None
        pval = self.prev and self.prev.value or None
        return f"[{self.value}, {repr(nval)}, {repr(pval)}]"


class DoubleLinkedList(object):

    def __init__(self):
        self.begin = None
        self.end = None

    def push(self, obj):
        if self.end:
            node = DoubleLinkedListNode(obj, None, self.end)
            self.end.next = node
            self.end = node
        else:
            self.begin = DoubleLinkedListNode(obj, None, None)
            self.end = self.begin

    def pop(self):
        if self.end:
            node = self.end

            if self.end == self.begin:
                self.end = None
                self.begin = None
            else:
                self.end = node.prev
                self.end.next = None

                if self.end == self.begin:
                    self.begin.next = None

            return node.value
        else:
            return None

    def unshift(self):
        if self.begin:
            node = self.begin

            if self.end == self.begin:
                self.end = None
                self.begin = None
            else:
                self.begin = node.next
                self.begin.prev = None

            return node.value
        else:
            return None

    def shift(self, obj):
        self.push(obj)

    def detach_node(self, node):
        if node == self.end:
            self.pop()
        elif node == self.begin:
            self.unshift()
        else:
            prev = node.prev
            nxt = node.next
            prev.next = nxt
            nxt.prev = prev

    def remove(self, obj):
        node = self.begin
        count = 0

        while node:
            if node.value == obj:
                self.detach_node(node)
                return count
            else:
                count += 1
                node = node.next

        return -1

    def first(self):
        return self.begin and self.begin.value or None

    def last(self):
        return self.end and self.end.value or None

    def count(self):
        node = self.begin
        count = 0

        while node:
            node = node.next
            count += 1

        return count

    def get(self, index):
        node = self.begin
        i = 0
        while node:
            if i == index:
                return node.value
            else:
                i += 1
                node = node.next

        return None

    def dump(self, mark='----'):
        node = self.begin
        print(mark)
        while node:
            print(node, " ", end='')
            node = node.next
        print()

    def _invariant(self):
        if self.begin == None:
            assert self.end == None, "End set while begin is not."

        if self.begin:
            assert self.begin.prev == None, "begin.prev not None"
            assert self.end.next == None, "end.next not None"
