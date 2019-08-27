// for pdf generator
const services = [
    {name: 'generalWelding', value: 'circle'},
    {name: 'generalRepair', value: 'circle'},
    {name: 'basementDoor', value: 'circle'},
    {name: 'fireEscapes', value: 'circle'},
    {name: 'awnings', value: 'circle'},
    {name: 'railins', value: 'circle'},
    {name: 'fences', value: 'circle'},
    {name: 'stairs', value: 'circle'},
    {name: 'gates', value: 'circle'},
    {name: 'securityDoo', value: 'circle'},
    {name: 'sindowGuards', value: 'circle'},
    {name: 'otherServices', value: 'circle'}
  ];
  
  for (let [key, value] of Object.entries(this.documentForm.value.services)) {
    console.log(`${key}: ${value}`);
    if (value) {
      console.log(key);
    }
  }

  const obj = this.documentForm.value.services;
  const result = Object.keys(obj).map(function(key) {
    return [String(key), obj[key]];
  });
  result.forEach((name, index) => {
    if (name[1]) { 
      services[index].value = 'dot';
    }
  });