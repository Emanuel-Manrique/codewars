using System;
using System.Collections.Generic;
using System.Linq;

public class Kata
{
    private static readonly Dictionary<char, List<string>> Adjacent = new Dictionary<char, List<string>>
    {
        {'0', new List<string> {"0", "8"}},
        {'1', new List<string> {"1", "2", "4"}},
        {'2', new List<string> {"1", "2", "3", "5"}},
        {'3', new List<string> {"2", "3", "6"}},
        {'4', new List<string> {"1", "4", "5", "7"}},
        {'5', new List<string> {"2", "4", "5", "6", "8"}},
        {'6', new List<string> {"3", "5", "6", "9"}},
        {'7', new List<string> {"4", "7", "8"}},
        {'8', new List<string> {"0", "5", "7", "8", "9"}},
        {'9', new List<string> {"6", "8", "9"}}
    };

    private static Dictionary<string, List<string>> memo = new Dictionary<string, List<string>>();

    public static List<string> GetPINs(string observed)
    {
        if (string.IsNullOrEmpty(observed))
            return new List<string>();

        // ? Base case: if observed pin is one digit, return its variations
        if (observed.Length == 1) return Adjacent[observed[0]];

        if (memo.ContainsKey(observed)) return memo[observed];

        // ? Split the observed pin into the first digit and the remaining digits
        var firstDigit = observed[0];
        var remainingDigits = observed.Substring(1);

        // Usin SelectMany to simplify nested looping.
        // For each variation of the first digit, recursively call GetPINs 
        // on the remaining digits and concatenate the results.
        var result = Adjacent[firstDigit].SelectMany(variation => 
                GetPINs(remainingDigits).Select(combination => variation + combination))
            .ToList();

        memo[observed] = result;
        
        return result;
    }
}
