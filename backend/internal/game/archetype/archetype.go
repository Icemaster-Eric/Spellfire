package archetype

import (
	"log"
	"math/big"
	"strconv"

	"github.com/kelindar/column"
)

type Archetype struct {
	Signature *big.Int
	Entities []uint32
	Columns *column.Collection
}

func (a *Archetype) AddEntity(entityID uint32, insertValues func(r column.Row) error) {
	log.Println("adding entity:", entityID)
	a.Entities = append(a.Entities, entityID)
	log.Println("start row count:", a.Columns.Count())
	err := a.Columns.InsertKey(strconv.FormatUint(uint64(entityID), 16), insertValues)
	if err != nil {
		log.Println("add entity err:", err)
	}
	log.Println("end row count:", a.Columns.Count())
}

func (a *Archetype) RemoveEntity(entityID uint32) {
	a.Columns.DeleteKey(strconv.FormatUint(uint64(entityID), 16))
}

func GetSignature(components []int) *big.Int {
	signature := big.NewInt(0)
	for _, comp := range components {
		signature.SetBit(signature, comp, 1)
	}
	return signature
}

type SignatureChecker struct {
	withSig *big.Int
	withoutSig *big.Int
	tmp1 *big.Int
	tmp2 *big.Int
}

func (sc *SignatureChecker) MatchesWith(signature *big.Int) bool {
	sc.tmp1.And(signature, sc.withSig)
	return sc.tmp1.Cmp(sc.withSig) == 0
}

func (sc *SignatureChecker) MatchesWithout(signature *big.Int) bool {
	sc.tmp2.And(signature, sc.withoutSig)
	return sc.tmp2.Sign() != 0
}

func (sc *SignatureChecker) MatchesWithWithout(signature *big.Int) bool {
	sc.tmp1.And(signature, sc.withSig)
	if sc.tmp1.Cmp(sc.withSig) != 0 {
		return false
	}
	sc.tmp2.And(signature, sc.withoutSig)
	return sc.tmp2.Sign() != 0
}


func NewSignatureChecker(withSig, withoutSig *big.Int) *SignatureChecker {
	return &SignatureChecker{
		withSig:    new(big.Int).Set(withSig),
		withoutSig: new(big.Int).Set(withoutSig),
		tmp1:       new(big.Int),
		tmp2:       new(big.Int),
	}
}
