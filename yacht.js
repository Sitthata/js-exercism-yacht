//
// This is only a SKELETON file for the 'Yacht' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
const normalCategory = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'];

const createOccurrences = (rolls) => {
  const occurrences = new Map()
  // initialize occurrences
  rolls.forEach((roll) => {
    if (occurrences.has(roll)) {
      occurrences.set(roll, occurrences.get(roll) + 1)
    } else {
      occurrences.set(roll, 1);
    }
  });
  return occurrences;
}

const calculateFullHouse = (rolls) => {
  // Create a map of the occurrences of each number
  const occurrences = createOccurrences(rolls);
  
  // Validation
  let isValidFullHouse = false;
  if (occurrences.size === 2) {
    const count = Array.from(occurrences.values());
    if ((count[0] === 2 && count[1] === 3) || (count[0] === 3 && count[1] === 2))
      isValidFullHouse = true;
  }

  // Calculate the total score if it is valid
  const totalScore = sum(rolls)
  return isValidFullHouse ? totalScore : 0;
};

const calculateFourOfAKind = (rolls) => {
  // Logic for Four of a Kind
  const occurrences = createOccurrences(rolls);
  
  // Validation
  let isValidFourOfAKind = false;
  let fourOfAKindValue = 0;
  occurrences.forEach((count, key) => {
    if (count >= 4) {
      isValidFourOfAKind = true;
      fourOfAKindValue = key;
    }
  });
  return isValidFourOfAKind ? fourOfAKindValue * 4 : 0;
};

const calculateBigStraight = (rolls) => {
  // Logic for Little Straight
  if (rolls[0] !== 2) return 0;
  return isStraight(rolls) ? 30 : 0;
};

const calculateLittleStraight = (rolls) => {
  // Logic for Little Straight
  if (rolls[0] !== 1) return 0;
  return isStraight(rolls) ? 30 : 0;
};

const isStraight = (rolls) => {
  const sortRolls = rolls.sort((a, b) => a - b);
  for (let i = 1; i < sortRolls.length; i++) {
    if (sortRolls[i] !== sortRolls[i - 1] + 1) return false;
  }
  return true;
}


// Function for calculating Choice
const calculateChoice = (rolls) => {
  // Logic for Choice
  return sum(rolls);
};

// Function for calculating Yacht
const calculateYacht = (rolls) => {
  // Logic for Yacht
  const isValid = rolls.every((current, index, arr) => {
    if (index === 0) return true;
    return arr[0] === current;
  });
  return isValid ? 50 : 0;
};

const specialCategoryMapping = {
  'full house': calculateFullHouse,
  'four of a kind': calculateFourOfAKind,
  'little straight': calculateLittleStraight,
  'big straight': calculateBigStraight,
  'choice': calculateChoice,
  'yacht': calculateYacht
};

const calculateNormal = (rolls, category) => {
  // calculate normal scoring
  const categoryToNumber = {
    'ones': 1,
    'twos': 2,
    'threes': 3,
    'fours': 4,
    'fives': 5,
    'sixes': 6
  }
  const number = categoryToNumber[category.toLowerCase()];
  let totalScore = 0;
  rolls.forEach((roll) => {
    if (roll === number) {
      totalScore += roll;
    }
  })
  return totalScore;
}

const calculateSpecial = (rolls, category) => {
  const scoringFunction = specialCategoryMapping[category]
  // calculate special rules
  return scoringFunction ? scoringFunction(rolls) : 0;
}

// Utility
const sum = (rolls) => {
  return rolls.reduce((prev, curr) => prev + curr, 0);
}
// Test

console.log("test");
export const score = (rolls, category) => {
  // Check for category conditon
  return normalCategory.includes(category) ?
    calculateNormal(rolls, category) : calculateSpecial(rolls, category);
};
