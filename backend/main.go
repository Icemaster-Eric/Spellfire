package main

import (
	"fmt"

	"github.com/kelindar/column"
)

func main() {
	collection := column.NewCollection()
	collection.CreateColumn("name", column.ForKey())
	collection.CreateColumn("x", column.ForFloat64())
	collection.CreateColumn("y", column.ForFloat64())
	collection.InsertKey("hello", func(r column.Row) error {
		r.SetFloat64("x", 1)
		r.SetFloat64("y", 2)
		return nil
	})
	collection.Query(func(txn *column.Txn) error {
		nameCol := txn.Key()
		xCol := txn.Float64("x")
		yCol := txn.Float64("y")
		return txn.Range(func(idx uint32) {
			name, _ := nameCol.Get()
			x, _ := xCol.Get()
			y, _ := yCol.Get()
			fmt.Println(name, x, y)
		})
	})
}
