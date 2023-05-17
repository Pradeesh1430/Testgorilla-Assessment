import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [output, setOutput] = useState(null);
  const [input, setInput] = useState("");

  const clickHandler = async () => {
    const nums = input.split(",").map(Number);
    const n = nums.length >> 1;
    const f = new Map();
    const g = new Map();
    const inf = Infinity;

    for (let i = 0; i < 1 << n; i++) {
      let s = 0;
      let cnt = 0;
      let s1 = 0;
      let cnt1 = 0;
      for (let j = 0; j < n; j++) {
        if ((i & (1 << j)) !== 0) {
          s += nums[j];
          cnt += 1;
          s1 += nums[n + j];
          cnt1 += 1;
        } else {
          s -= nums[j];
          s1 -= nums[n + j];
        }
      }
      if (!f.has(cnt)) {
        f.set(cnt, new Set());
      }
      if (!g.has(cnt1)) {
        g.set(cnt1, new Set());
      }
      f.get(cnt).add(s);
      g.get(cnt1).add(s1);
    }

    let ans = inf;
    for (let i = 0; i <= n; i++) {
      const fi = Array.from(f.get(i)).sort();
      const gi = Array.from(g.get(n - i)).sort();
      for (let a of fi) {
        let left = 0;
        let right = gi.length - 1;
        const b = -a;
        while (left < right) {
          const mid = (left + right) >> 1;
          if (gi[mid] >= b) {
            right = mid;
          } else {
            left = mid + 1;
          }
        }
        ans = Math.min(ans, Math.abs(a + gi[left]));
        if (left > 0) {
          ans = Math.min(ans, Math.abs(a + gi[left - 1]));
        }
      }
    }

    // Call api to store the input and output
    try {
      const url = "http://localhost:5000/minimum-possible"; // Replace with your server URL
      const data = {
        input: input,
        output: output,
      };

      const response = await axios.post(url, data);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
    // return ans;
    setOutput(ans);
  };

  return (
    <div className="App">
      <div class="container">
        <div class="row">
          <div class="col-md-6 mx-auto">
            <h1>Minimum Absolute Difference</h1>
            <form>
              <div class="form-group">
                <label for="inputArray">Enter integer array:</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputArray"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setOutput(null);
                  }}
                  placeholder="e.g. 3,9,7,3"
                />
              </div>
              <button
                type="button"
                class="btn btn-primary"
                onClick={clickHandler}
              >
                Calculate
              </button>
            </form>
            <br />
            <div class="alert alert-info" role="alert" id="output">
              Minimum Absolute Difference:{" "}
              <span id="minDiff">{output ?? output}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
