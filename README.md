# TOP-knights-travails

https://www.theodinproject.com/lessons/javascript-knights-travails

<!--
todo:
    -need refactor:
        -safe to assume that no squares should be revisted (i believe that would basically be the same as a shorter path with a little detour) i.e.: the shortest path will never repeat a square
        -need pass the pathLog to the possMoveFinder

    idea:
        - store all possible paths in array, the loop through for shortest

        -may try writing agian, but starting from end point and branching (with reverse jumps)
            -use a root to have a parent node prop (point back prop), use that as the path log


    update:
        -can't create all paths, too computationally expensize, crashes
            -think ill need to:
                -run possMoves and check for endpont each time
                -if no match, run possMoves on all possMoves and check again
                -may be good to just have the pointback prop (less mem)


 -->
