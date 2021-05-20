def reverse(string):
    newString=string.split()
    reversedString=string()
    for word in newString:
        wordSplit=word.split()
        reverseWord=””

        for j in range(len(wordSplit)):
            reverseWord+=wordSplit[j]
        reversedString=reverseWord+” “
        
    return reversedString

reverse("Hello world")