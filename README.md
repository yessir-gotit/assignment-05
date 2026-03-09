# assignment-05

1. var is function scope, that means you can declare it anywhere in the function and it can be used anywhere on that function, let is block scope which means if you declare the variable inside a for loop then you can't output it of that variable outside the for loop. const is also same as let but the value of const is immutable.

2. spread operator is like a packed suitcase, it spreads the element of an array and object, suppose we wanna merge 2 arrays like [1,4] and [3,5]. If I wanna merge the first array into second one, then I can use second = [3, ...first , 5] now the output will be [3,1,4,5]. It simplifies many complex problems.

3. on foreach loop we can perform an action on an array but the original array would be unaffected and on the map() we can perform actions but it can create a new array based on that action and the filter() just filters an array based on specific conditions

4. It's a modern and shorter way to write functions, it makes the code readable. It also has implicit return so that we don't have to return anything like normal functions also it's lexical scope which means in normal function the outer one can't see in the inner function but on the lexical thing, it can see its surrounding code and run based on that

5. template literals is a powerful and modernized way to handle strings in js. before that the code used to look ugly, and we had to use + operator for variable but now we can use ${} for variable which is easy to read and easier for scalibility. It's 1:1 for on code and output
