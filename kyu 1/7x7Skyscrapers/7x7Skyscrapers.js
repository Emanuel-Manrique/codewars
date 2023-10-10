class SkyscraperSolver {
    constructor(dimensions) {
        this.DIM = dimensions;
        this.SIDES = 4;
        this.MASK = (1 << this.DIM) - 1;

        this.potentials = Array(this.DIM * this.DIM).fill(this.MASK);
        this.finalGrid = Array.from({ length: this.DIM }, () => Array(this.DIM).fill(0));
        this.visited = Array(this.DIM * this.DIM).fill(true);
        this.hints = [];

        this.sideOrigins = [0, 1, 2, 3, 4, 5, 6, 6, 13, 20, 27, 34, 41, 48, 48, 47, 46, 45, 44, 43, 42, 42, 35, 28, 21, 14, 7, 0];
        this.sideSteps = [7, 7, 7, 7, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, -7, -7, -7, -7, -7, -7, -7, 1, 1, 1, 1, 1, 1, 1];
    }

    setValue(x, v) {
        const m = this.MASK ^ (1 << v);
        const sRow = x - x % this.DIM;
        const sCol = x % this.DIM;
        for (let i = 0; i < this.DIM; i++) {
            this.potentials[sRow + i] &= m;
            this.potentials[sCol + i * this.DIM] &= m;
        }
        this.potentials[x] = 1 << v;
    }

    checkUnique() {
        let numDecides = 0;

        for (let i = 0; i < this.SIDES / 2 * this.DIM; i++) {
            const possibleIndices = {};

            for (let j = this.sideOrigins[i], k = 0; k < this.DIM; j += this.sideSteps[i], k++) {
                for (let l = 0; l < this.DIM; l++) {
                    if ((1 << l) & this.potentials[j]) {
                        if (!possibleIndices[l]) possibleIndices[l] = [];
                        possibleIndices[l].push(j);
                    }
                }
            }

            for (const val in possibleIndices) {
                if (possibleIndices[val].length === 1) {
                    const idx = possibleIndices[val][0];
                    if (this.potentials[idx] !== (1 << val)) {
                        numDecides++;
                        this.setValue(idx, parseInt(val, 10));
                    }
                }
            }
        }

        return numDecides;
    }

    filter2() {
        let count = 0;
        for (let i = 0; i < this.SIDES * this.DIM; i++) {
            if (this.hints[i] === 2) {
                let maskLocal = this.MASK;
                for (let l = this.DIM - 1; l >= 0; l--) {
                    const m = (1 << l) & this.potentials[this.sideOrigins[i]];
                    maskLocal ^= 1 << l;
                    if (m) break;
                }

                for (let j = this.sideOrigins[i] + this.sideSteps[i], k = 1; k < this.DIM; j += this.sideSteps[i], k++) {
                    const m = (1 << (this.DIM - 1)) & this.potentials[j];
                    if (m) break;
                    if ((this.potentials[j] | maskLocal) !== maskLocal) {
                        this.potentials[j] &= maskLocal;
                        count++;
                    }
                }
            }
        }
        return count;
    }

    countPossible(val) {
        let count = 0;
        while (val) {
            count += val & 1;
            val >>= 1;
        }
        return count;
    }

    isValidConfiguration() {
        for (let i = 0; i < this.SIDES * this.DIM; i++) {
            if (this.hints[i] === 0) continue;

            let isDecided = true;
            for (let j = this.sideOrigins[i], k = 0; k < this.DIM; j += this.sideSteps[i], k++) {
                if (this.countPossible(this.potentials[j]) !== 1) {
                    isDecided = false;
                    break;
                }
            }

            if (isDecided) {
                let largest = 0, clueCount = 0;
                for (let j = this.sideOrigins[i], k = 0; k < this.DIM; j += this.sideSteps[i], k++) {
                    if (largest < this.potentials[j]) {
                        clueCount++;
                        largest = this.potentials[j];
                    }
                }
                if (clueCount !== this.hints[i]) return false;
            }
        }
        return true;
    }

    populateResults() {
        for (let i = 0; i < this.DIM * this.DIM; i++) {
            const x = Math.floor(i / this.DIM);
            const y = i % this.DIM;

            for (let j = 0; j < this.DIM; j++) {
                if ((1 << j) === this.potentials[i]) {
                    this.finalGrid[x][y] = j + 1;
                    break;
                }
            }
        }
    }

    depthFirstSearch(idx) {
        let i = -1, tmp = 10000;
        for (let _i = 0; _i < this.DIM * this.DIM; _i++) {
            const c = this.countPossible(this.potentials[_i]);
            if (tmp > c && !this.visited[_i]) {
                tmp = c;
                i = _i;
            }
        }

        if (i === -1) {
            if (this.isValidConfiguration()) {
                this.populateResults();
                return true;
            }
            return false;
        }

        const possibleBackup = [...this.potentials];

        for (let j = this.DIM - 1; j >= 0; j--) {
            const m = (1 << j) & this.potentials[i];
            if (!m) continue;

            this.visited[i] = true;
            this.setValue(i, j);

            if (this.isValidConfiguration() && this.depthFirstSearch(idx + 1)) {
                return true;
            }

            this.visited[i] = false;
            this.potentials = [...possibleBackup];
        }
        return false;
    }

    initialize() {
        for (let i = 0; i < this.DIM * this.DIM; i++) {
            this.potentials[i] = this.MASK;
            this.visited[i] = true;
        }
    }

    preprocess() {
        for (let i = 0; i < this.SIDES * this.DIM; i++) {
            if (this.hints[i] === 0) continue;

            for (let j = this.sideOrigins[i], k = 0; k < this.DIM; j += this.sideSteps[i], k++) {
                let maskLocal = this.MASK;
                for (let l = this.DIM + k - this.hints[i] + 1; l < this.DIM; l++) {
                    maskLocal ^= 1 << l;
                }
                this.potentials[j] &= maskLocal;
            }
        }
        while (this.checkUnique() > 0);
        this.filter2();
    }

    solve(inputClues) {
        this.initialize();
        this.hints = inputClues;
        this.preprocess();

        for (let i = 0; i < this.DIM * this.DIM; i++) {
            if (this.countPossible(this.potentials[i]) > 1) {
                this.visited[i] = false;
            }
        }

        this.depthFirstSearch(0);
        return this.finalGrid;
    }
}

function solvePuzzle(inputClues) {
    const skyscraperSolver = new SkyscraperSolver(7);
    return skyscraperSolver.solve(inputClues);
}
