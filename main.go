package main

import "fmt"

func main() {
	myStruct := TestStruct{Components: []any{1, 2, "hello"}}
	fmt.Println(myStruct)
}

type TestStruct struct {
	Components []any
}
