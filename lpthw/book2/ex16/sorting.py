import dllist


def bubble_sort(numbers):
    """Sorts a list of numbers using bubble sort."""
    while True:
        is_sorted = True
        node = numbers.begin.next
        while node:
            if node.prev.value > node.value:
                node.prev.value, node.value = node.value, node.prev.value
                is_sorted = False
            node = node.next

        if is_sorted:
            break


def count(node):
    count = 0

    while node:
        node = node.next
        count += 1

    return count
