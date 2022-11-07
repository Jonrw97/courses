from shutil import unregister_archive_format


class SingleLinkedListNode(object):

    def __init__(self, value, nxt):
        self.value = value
        self.next = nxt

    def __repr__(self):
        nval = self.next and self.next.value or None
        return f"[{self.value}:{repr(nval)}]"


class SingleLinkedList(object):

    def __init__(self):
        self.begin = None
        self.end = None

    def push(self, obj):
        """Appends a new value on the end of the list."""
        node = SingleLinkedListNode(obj, None)

        if self.begin == None:
            self.begin = node
            self.end = self.begin

        else:
            self.end.next = node
            self.end = node
            assert self.begin != self.end

        assert self.end.next == None

    def pop(self):
        """Removes the last item and returns it."""

        popped = self.end
        if popped == None:
            return None

        if self.begin == self.end:
            self.begin = None
            self.end = self.begin

        else:
            new_next = SingleLinkedList.find_new_next(self)
            self.end = new_next
            new_next.next = None

        return popped.value

    def find_new_next(self):
        """Finds the new next node"""
        x = self.begin
        while x.next.next != None:
            x = x.next

        return x

    def shift(self, obj):
        """Another name for push."""
        shifted_node = SingleLinkedListNode(obj, None)
        if self.begin == None:
            self.begin = shifted_node
            self.end = self.begin

        else:
            next_value = self.begin
            self.begin = shifted_node
            self.begin.next = next_value
            assert self.begin != self.end

        assert self.end.next == None

    def unshift(self):
        """Removes the first item and returns it."""
        unshifted = self.begin

        if unshifted == None:
            return
        else:
            self.begin = self.begin.next
            return unshifted.value

    def first(self):
        """Returns a *reference* to the first item, does not remove."""
        first = self.begin
        return first.value

    def last(self):
        """Returns a reference to the last item, does not remove."""
        last = self.end
        return last.value

    def count(self):
        """Counts the number of elements in the list."""

        node = self.begin
        count = 0
        while node:
            count += 1
            node = node.next

        return count

    def get(self, index):
        """Get the value at index."""
        node = self.begin
        count = 0
        while count != index:
            count += 1
            node = node.next
        if node == None:
            return None
        else:
            return node.value

    def dump(self, mark):
        """Debugging function that dumps the contents of the list."""
        parse_text = mark.split()
        direction = parse_text[0]
        word = parse_text[1].capitalize()
        node = self.begin
        dump = []
        
        while word != node.value:
            node = node.next
            if node == None:
                return None

        if direction == "after":
           
            node = node.next
            while node != None:
                dump.append(node)
                node = node.next

            return dump
        elif direction == "before":
            node = self.begin
            while node.value != word:
                dump.append(node)
                node = node.next
            return dump

        else:
            return None

    def remove(self, obj):
        """Finds a matching item and removes it from the list."""
        removed = SingleLinkedList()
        if self.begin.value == obj:
            self.begin = self.begin.next
            return 0
        elif self.begin == None:
            return None
        else:
            node_previous = self.begin
            node = self.begin.next
            node_next = node.next
            
            while node.value != obj:
                node_previous = node_previous.next
                node = node.next
                node_next = node_next.next

            node = node_previous
            node.next = node_next

            count_node = self.begin
            count = 0
            while count_node:
                count += 1
                count_node = count_node.next
            return count


