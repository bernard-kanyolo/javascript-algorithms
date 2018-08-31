/**
 * Simple HashTable implementation
 * Uses simple linear probing for collission detection,
 * Initial size should ideally be significantly larger than one with linked-list backed separate chaining
 *
 *
 */
class HashTable {
    constructor(size = 100) {
        this.buckets = Array(size).fill(null);
    }

    hash(key) {
        const hash = Array.from(key).reduce(
            (hashAccumulator, keySymbol) => (hashAccumulator + keySymbol.charCodeAt(0)),
            0,
        );

        return hash % this.buckets.length;
    }

    set(key, value) {
        const index = this.hash(key)

        if (this.buckets[index]) {
            // collission, probe for some space in next indices
            for(let i = index; i < this.buckets.length; i++) {
                if (this.buckets[i].key === key) {
                    // we're replacing
                    this.buckets[i] = { key, value }
                    return
                }


                if (!this.buckets[i]) {
                    // we've found empty slot, so it did not exist. create new one
                    this.buckets[i] = { key, value }
                    return
                }
            }

            // if we reach here then it means we've used all slots > initial index, need to resize then save
            prevLength = this.buckets.length;
            this.buckets.length += 50;
            for (let i = prevLength - 1; i < this.buckets.length; i++) {
                this.buckets[i] = null;
            }
            this.buckets[prevLength - 1] = { key, value };
        } else {
            this.buckets[index] = { key, value };
        }
    }

    get(key) {
        const index = this.hash(key)

        for (let i = index; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                if (this.buckets[i].key === key) {
                    return this.buckets[i].value
                }
            } else {
                return undefined
            }
        }
    }

    delete(key) {
        const index = this.hash(key)

        let deletedIndex;
        for (let i = index; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                if (this.buckets[i].key === key) {
                    this.buckets[i] = null
                    deletedIndex = i
                } else if (deletedIndex && this.hash(this.buckets[i].key) <= deletedIndex) {
                    this.buckets[deletedIndex] = this.buckets[i]
                    this.buckets[i] = null
                    deletedIndex = i
                }
            } else {
                return
            }
        }
    }
}

const table = new HashTable()

table.set("key1", "value1")
table.set("key2", "value2")

console.log(table.get("key1"));

table.set("key1", "newValue1")

console.log(table.get("key1"));
console.log(table.get("key2"));
console.log(table.get("key3"));

table.delete("key1")

console.log(table.get("key1"));




