package archetype

import (
	"math/big"
	"strconv"

	"github.com/kelindar/column"
)

type Archetype struct {
	Signature *big.Int
	// Entities map[uint32]struct{} // DON'T USE THIS FOR NOW, TRY COLUMN-ONLY APPROACH
	Columns *column.Collection
}

func (a *Archetype) AddEntity(entityID uint32, insertValues func(r column.Row) error) {
	// a.Entities[entityID] = struct{}{}
	a.Columns.InsertKey(strconv.FormatUint(uint64(entityID), 16), insertValues)
}

func (a *Archetype) RemoveEntity(entityID uint32) {
	a.Columns.DeleteKey(strconv.FormatUint(uint64(entityID), 16))
	// delete(a.Entities, entityID)
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
	return sc.tmp2.Sign() == 0
}

func (sc *SignatureChecker) MatchesWithWithout(signature *big.Int) bool {
	sc.tmp1.And(signature, sc.withSig)
	if sc.tmp1.Cmp(sc.withSig) != 0 {
		return false
	}
	sc.tmp2.And(signature, sc.withoutSig)
	return sc.tmp2.Sign() == 0
}


func NewSignatureChecker(withSig, withoutSig *big.Int) *SignatureChecker {
	return &SignatureChecker{
		withSig:    new(big.Int).Set(withSig),
		withoutSig: new(big.Int).Set(withoutSig),
		tmp1:       new(big.Int),
		tmp2:       new(big.Int),
	}
}
