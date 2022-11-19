export default `

    function BFS(start, goal)
        openSet := {start}
        visitedSet := {start}

        while openSet is not empty
            size = size of openSet
            repeat size times:
              current := the node in openSet at the top of the stack
              if current = goal
                  return Found

              openSet.Remove(current)
              for each neighbor of current
                  if neighbor not in visitedSet
                    visitedSet.add(neighbor)
                    openSet.add(neighbor)

        // Open set is empty but goal was never reached
        return Not Found`