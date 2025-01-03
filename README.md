# TOP-knights-travails

https://www.theodinproject.com/lessons/javascript-knights-travails

<!--
todo:
    -notes:
        -safe to assume that no squares should be revisted (i believe that would basically be the same as a shorter path with a little detour) i.e.: the shortest path will never repeat a square
        -memory:
            -having pathLog and possSquare may use too much memory
            -don't think there needs to be a map everything (too much memory)
            -probably good enough just to have a parent property on a square (pointBack builds the path log)
        -thought about work backwards from endpoint but its the same difference



    update:
        -can't create all paths, too computationally expensize, crashes
            -think ill need to:
                -run possMoves and check for endpont each time
                -if no match, run possMoves on all possMoves and check again
                -may be good to just have the pointback prop (less mem)

 -->
