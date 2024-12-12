const start: number = 3.32871;
const size: number = (2 * Math.PI) - start;
const starting_value: number = 0.5;

export class ChaosNumber {
  private true_seed: number = 0;
  private o1: number = starting_value;

  constructor(seed: number, tolerance: number = 0.0001, samples: number = 10000){
    if(!Number.isFinite(seed)){
      throw "Invalid seed value.";
    }
    if(seed < 0){
      throw "Seed must be bigger than 0.";
    }
    if(!Number.isInteger(seed)){
      throw "Seed must be a positive integer.";
    }
    if(!Number.isFinite(tolerance)){
      throw "invalid tolerance value.";
    }
    if(tolerance < 0){
      throw "Tolerance must be bigger than 0.";
    }
    if(!Number.isFinite(samples)){
      throw "Invalid sample size value";
    }
    if(samples < 0){
      throw "Sample size must be bigger than 0.";
    }
    if(!Number.isInteger(samples)){
      throw "Sample size must be a positive integer.";
    }
    this.true_seed = seed;
    while(true){
      let p1: number = starting_value;
      let sum: number = 0;
      for(let x = 0;x < samples;x++){
        p1 = this.circleMap(start + ((this.true_seed / 100000) % size), p1);
        let lyapunov_sample: number = this.lyapunovCircleMap(start + ((this.true_seed / 100000) % size), p1);
        if(Number.isFinite(lyapunov_sample)){
          sum += lyapunov_sample;
        }
      }
      let lyapunov = sum / samples;
      if(lyapunov < tolerance / 10){
        this.true_seed += 10000;
      }
      else{
        break;
      }
    }
  }

  public next(): number {
    this.o1 = this.circleMap(start + ((this.true_seed / 100000) % size), this.o1);
    return this.o1;
  }

  public getTrueSeed(): number {
    return this.true_seed;
  }

  private circleMap(_k: number, o0: number = starting_value): number {
    return (o0 + (1/3) + ((_k / (2 * Math.PI)) * Math.sin(2 * Math.PI * o0))) % 1;
  }

  private lyapunovCircleMap(_k: number, o: number): number {
    return Math.log(Math.abs(1 + (_k * Math.cos(2 * Math.PI * o))));
  }
}