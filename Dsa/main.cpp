
#include <iostream>
#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <queue>
#include <sstream>
#include <string>
#include <algorithm>

using namespace std;

class BlindSpotEngine {

private:

    unordered_map<string, vector<string>> graph;

public:

    // Construct the knowledge graph

    BlindSpotEngine() {

        graph["financial"] = {
            "hiddenCost", "opportunity", "resources"
        };

        graph["opportunity"] = {
            "alternatives", "future", "time"
        };

        graph["hiddenCost"] = {
            "maintenance", "legal", "risk"
        };

        graph["time"] = {
            "lifestyle", "learning", "opportunity"
        };

        graph["maintenance"] = {
            "resources", "financial"
        };

        graph["resources"] = {
            "compatibility", "time"
        };

        graph["alternatives"] = {
            "flexibility", "future"
        };

        graph["risk"] = {
            "backup", "dependency", "hiddenCost"
        };

        graph["backup"] = {
            "alternatives", "financial"
        };

        graph["dependency"] = {
            "legal", "resources"
        };

        graph["future"] = {
            "learning", "flexibility"
        };

        graph["flexibility"] = {
            "alternatives", "future"
        };

        graph["lifestyle"] = {
            "health", "social"
        };

        graph["health"] = {
            "lifestyle", "time"
        };

        graph["compatibility"] = {
            "resources", "alternatives"
        };

        graph["learning"] = {
            "time", "future"
        };

        graph["social"] = {
            "lifestyle", "dependency"
        };

        graph["legal"] = {
            "risk", "hiddenCost"
        };

    }


    // BFS to discover connected factors

    vector<string> discover(
        vector<string>& startingFactors,
        int maxDepth
    ) {

        queue<pair<string, int>> q;

        unordered_set<string> visited;

        vector<string> discovered;


        // Add initial factors to the queue

        for (string factor : startingFactors) {

            if (visited.insert(factor).second) {

                q.push({factor, 0});

            }

        }


        // Perform BFS

        while (!q.empty()) {

            auto current = q.front();

            q.pop();

            string node = current.first;

            int depth = current.second;


            if (depth >= maxDepth) {
                continue;
            }


            // Explore adjacent factors

            for (string neighbour : graph[node]) {

                if (visited.find(neighbour) == visited.end()) {

                    visited.insert(neighbour);

                    discovered.push_back(neighbour);

                    q.push({
                        neighbour,
                        depth + 1
                    });

                }

            }

        }

        return discovered;

    }

};


// Convert comma-separated input into vector

vector<string> parseInput(string input) {

    vector<string> result;

    stringstream ss(input);

    string item;

    while (getline(ss, item, ',')) {

        item.erase(
            remove_if(
                item.begin(),
                item.end(),
                ::isspace
            ),
            item.end()
        );

        if (!item.empty()) {

            result.push_back(item);

        }

    }

    return result;

}


// MAIN FUNCTION

int main() {

    BlindSpotEngine engine;

    string input;

    int depth;


    // First line: starting factor IDs

    getline(cin, input);


    // Second line: BFS depth

    cin >> depth;


    vector<string> startingFactors = parseInput(input);


    vector<string> result =
        engine.discover(startingFactors, depth);


    // Print discovered factor IDs

    for (int i = 0; i < result.size(); i++) {

        cout << result[i];

        if (i != result.size() - 1) {
            cout << ",";
        }

    }

    cout << endl;

    return 0;

}
