def ceaserEncrypt(str, rot):
    str = str.lower()
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    new_str = ''
    for c in str:
        if c in alphabet:
            new_str += alphabet[(alphabet.index(c)+int(rot)) % len(alphabet)]
        else:
            new_str += c
    return new_str

def ceaserDecrypt(str, rot):
    str = str.lower()
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    org_str = ''
    for c in str:
        if c in alphabet:
            org_str += alphabet[(alphabet.index(c)-int(rot)) % len(alphabet)]
        else:
            org_str += c
    return org_str

def ceaserCrack(str):

    max = 0
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    eng_frequency = [6.51, 1.89, 3.06, 5.08, 17.4,
                     1.66, 3.01, 4.76, 7.55, 0.27,
                     1.21, 3.44, 2.53, 9.78, 2.51,
                     0.29, 0.02, 7.00, 7.27, 6.15,
                     4.35, 0.67, 1.89, 0.03, 0.04, 1.13]

    count_letters = []
    s_letters = []
    for i in range(0, len(alphabet)):
        count_letters.append(0)
        s_letters.append(0)


    for c in str:
        if c in alphabet:
            count_letters[alphabet.index(c)] += 1

    for i in range(0, len(alphabet)):
        for j in range(0, len(alphabet)):
            s_letters[i] += 0.01 * count_letters[j] * eng_frequency[(j + i) % 26]
            if max < s_letters[i]:
                max = s_letters[i]

    return (26 - s_letters.index(max)) % 26

