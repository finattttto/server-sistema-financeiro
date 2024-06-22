import { Between, In, IsNull, Like, Not, Raw } from "typeorm";

export function trataParams(searchParams: any[]) {
  for (const sp of searchParams) {
    trataParam(sp);
  }
  return searchParams;
}

function trataParam(sp: any) {
  for (const field in sp) {
    if (typeof sp[field] == "string" && (sp[field] as string).includes("%")) {
      const value = sp[field] + "";
      sp[field] = Raw((alias) => `unaccent(lower(${alias})) ILIKE unaccent(lower('${value}'))`);
    } else if (field.startsWith("in-")) {
      sp[field.replace("in-", "")] = In(sp[field] as any[]);
      sp[field] = undefined;
    } else if (field.startsWith("between-")) {
      sp[field.replace("between-", "")] = Between(sp[field][0], sp[field][1]);
      sp[field] = undefined;
    } else if (field.startsWith("not-")) {
      if (sp[field] == null) {
        sp[field.replace("not-", "")] = Not(IsNull())
      } else {
        sp[field.replace("not-", "")] = Not(sp[field]);
      }
      sp[field] = undefined;
    } else if (sp[field] == null) {
      sp[field] = IsNull();
    } else if (
      typeof sp[field] == "string" &&
      (sp[field] as string).startsWith("@!")
    ) {
      sp[field] = Not((sp[field] as string).replace("@!", ""));
    } else if (typeof sp[field] == 'object') {
      sp[field] = trataParam(sp[field]);
      continue;

    }
  }
  return sp;
}

/*function trataParam(sp: any) {
  for (const field in sp) {
    if (typeof sp[field] === "object") {
      sp[field] = trataParam(sp[field]);
    }

    const { paramName, paramValue, compareType } = sp;

    if (compareType == "EQUAL") {             
      sp[paramName] = paramValue[0];
    } else if (compareType == "NOT_EQUAL") {   
      sp[paramName] = Not(paramValue[0]);
    } else if (compareType == "LIKE") {       
      sp[paramName] = Like(`%${paramValue[0]}%`);
    } else if (compareType == "BETWEEN") {     
      sp[paramName] = Between(paramValue[0], paramValue[1]);
    } else if (compareType == "NULL") {         
      sp[paramName] = IsNull();
    } else if (compareType == "NOT_NULL") {
      sp[paramName] = Not(IsNull());
    } else if (compareType == "GREATER_THAN") {
      sp[paramName] = MoreThan(paramValue[0]);
    } else if (compareType == "LOWER_THAN") {
      sp[paramName] = LessThan(paramValue[0]);
    }else{      
      sp[paramName] = paramValue[0];
    }

    delete sp.paramName;
    delete sp.paramValue;
    delete sp.compareType;
  }

  return sp;
}*/
