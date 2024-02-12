    const srpDefaultIncludeFields: string[] = [
    "vin", "make", "model", "trim", "blog_id", "display_price", "drivetrain",
    "year", "trim", "standardbody", "imagelist", "modelnumber",
    "sellingprice", "msrp", "title", "id", "miles", "type", "condition",
    "body", "price", "certified", "comment5", "carfaxhistoryreporturl", "carfaxoneowner", "carfaxhoverhtml",
    "carfaxlogo", "in_transit", "isspecial", "stock", "dealer_offer", "specials", "dealer_discount",
    "trans", "engdescription"
];

export const srpIncludeFields: Record<string, string[]> = {
    'cadillac': [
        ...srpDefaultIncludeFields,
        "priority_options", "extcolorgeneric"
    ],
    'canadacadillac': [
        ...srpDefaultIncludeFields,
        "priority_options", "extcolorgeneric", "reserve_flag", "status_disclaimer", "specials", "dealer_discount",
        "transdescription", "body", "drivetrain", "extcolor", "trans", "engdescription", "available_incentives",
        "in_transit", "isspecial", "stock", "dealer_offer",
    ],
    'chevrolet': [
        ...srpDefaultIncludeFields,
        "priority_options", "extcolorgeneric", "comment1", "transdescription", "in_transit", "isspecial",
        "status_disclaimer", "specials"
    ],
    'claremonttoyota': [
        ...srpDefaultIncludeFields,
        "reserve_flag", "status_disclaimer", "stock", "available_incentives", "transdescription", "dealer_offer",
        "in_transit", "isspecial", "specials", "extcolor", "intcolor", "drivetrain", "body",
        "extcolorgeneric", "extcolorhexcode", "int_colorgeneric", "intcolorhexcode", "cab", "bed", "trans", "has_video",
        "video_cc_url", "video_url", "dealer_discount", "comment1", "priority_options",

    ],
    'ford': [
        ...srpDefaultIncludeFields,
        "reserve_flag", "status_disclaimer", "stock", "available_incentives", "transdescription", "dealer_offer",
        "priority_options", "extcolorgeneric", "transdescription"
    ],
    'foxdealer': [
        ...srpDefaultIncludeFields,
        "priority_options", "isspecial", "specials", "extcolor", "intcolor", "drivetrain", "body",
        "extcolorgeneric", "extcolorhexcode", "int_colorgeneric", "intcolorhexcode", "transdescription",
        "dealer_offer", "status_disclaimer",
    ],
    'GMCtheme1': [
        ...srpDefaultIncludeFields,
        "priority_options", "isspecial", "specials", "extcolor", "intcolor", "drivetrain", "body",
        "extcolorgeneric", "extcolorhexcode", "int_colorgeneric", "intcolorhexcode", "transdescription",
        "dealer_offer", "status_disclaimer", "available_incentives",
    ],
    'Hondatheme1': [
        ...srpDefaultIncludeFields,
        "priority_options", "isspecial", "specials", "extcolor", "intcolor", "drivetrain", "body",
        "extcolorgeneric", "extcolorhexcode", "int_colorgeneric", "intcolorhexcode", "transdescription",
        "dealer_offer", "status_disclaimer",
    ],
    'hudsonauto': [
        ...srpDefaultIncludeFields,
        "priority_options", "isspecial", "specials", "extcolor", "intcolor", "drivetrain", "body", "stock",
        "extcolorgeneric", "extcolorhexcode", "int_colorgeneric", "intcolorhexcode", "transdescription",
        "video_cc_url", "video_url", "dealer_offer", "status_disclaimer",
    ],
    'jaguar': [
        ...srpDefaultIncludeFields,
        "priority_options", "extcolorgeneric", "dealer_offer", "status_disclaimer", "extcolor", "intcolor", "drivetrain",
        "extcolorgeneric", "extcolorhexcode", "int_colorgeneric", "intcolorhexcode", "transdescription",  "available_incentives",
        "standardbody", "trans", "engdescription"
    ],
    'lacdjr': [
        ...srpDefaultIncludeFields,
        "priority_options", "isspecial", "specials", "extcolor", "intcolor", "drivetrain", "body", "stock",
        "extcolorgeneric", "extcolorhexcode", "int_colorgeneric", "intcolorhexcode", "transdescription",
        "dealer_offer", "status_disclaimer",
    ],
    'landrover': [
        ...srpDefaultIncludeFields,
        "priority_options", "extcolorgeneric", "dealer_offer", "status_disclaimer", "extcolor", "intcolor", "drivetrain",
        "extcolorgeneric", "extcolorhexcode", "int_colorgeneric", "intcolorhexcode", "transdescription",  "available_incentives",
        "standardbody", "trans", "engdescription"
    ],
    'lexuscanadatheme1': [
        ...srpDefaultIncludeFields,
        "priority_options", "isspecial", "specials", "extcolor", "intcolor", "drivetrain", "body", "stock",
        "extcolorgeneric", "extcolorhexcode", "int_colorgeneric", "intcolorhexcode", "transdescription",
        "dealer_offer", "status_disclaimer",
    ],
    'mercedesbenz': [
        ...srpDefaultIncludeFields,
        "priority_options", "isspecial", "specials", "extcolor", "intcolor", "drivetrain", "body", "stock",
        "extcolorgeneric", "extcolorhexcode", "int_colorgeneric", "intcolorhexcode", "transdescription",
        "dealer_offer", "status_disclaimer",
    ],
    'murraycadillac': [
        ...srpDefaultIncludeFields,
        "priority_options", "isspecial", "specials", "extcolor", "intcolor", "drivetrain", "body", "stock",
        "extcolorgeneric", "extcolorhexcode", "int_colorgeneric", "intcolorhexcode", "transdescription",
        "dealer_offer", "status_disclaimer",
    ],
    'newtoyota': [
        ...srpDefaultIncludeFields,
        "priority_options", "transdescription", "dealer_discount", "standardbody", "body",
        "drivetrain", "transdescription", "engliters", "standardstyle", "reserve_flag", "status_disclaimer",
        "dealer_offer", "isspecial", "specials", "priority_options",
    ],
    'nissantheme1': [
        ...srpDefaultIncludeFields,
        "priority_options", "isspecial", "specials", "extcolor", "intcolor", "drivetrain", "body", "stock",
        "extcolorgeneric", "extcolorhexcode", "int_colorgeneric", "intcolorhexcode", "transdescription",
        "dealer_offer", "status_disclaimer", "standardbody", "trans", "engdescription"
    ],
    'nissantheme2': [
        ...srpDefaultIncludeFields,
        "stock", "drivetrain", "body", "standardstyle", "drivetrain", "standardbody", "transdescription",
        "extcolorgeneric", "extcolorhexcode", "int_colorgeneric", "intcolorhexcode", "extcolor", "intcolor",
        "priority_options", "isspecial", "specials", "extcolor", "intcolor", "drivetrain", "body", "stock",
        "extcolorgeneric", "extcolorhexcode", "int_colorgeneric", "intcolorhexcode", "transdescription",
        "dealer_offer", "status_disclaimer", "standardbody", "trans", "engdescription"
    ],
    'strathmoremotors': [
        ...srpDefaultIncludeFields,
        "stock", "drivetrain", "body", "standardstyle", "drivetrain", "standardbody", "transdescription",
    ],
    'toyota': [
        ...srpDefaultIncludeFields,
        "stock", "marketclass", "fueltype",
        "daysinstock", "friendlystyle", "transdescription", "engliters", "standardstyle", "engcyls",
        "trans", "engaspiration", "drivetrain", "engdescription", "dealer_offer", "conditional_price", "has_video",
        "video_cc_url", "video_url", "dealer_discount", "comment1"
    ],
    'toyotacanadatheme1': [
        ...srpDefaultIncludeFields,
        "reserve_flag", "status_disclaimer", "stock", "available_incentives", "standardbody", "transdescription", "dealer_offer",
        "in_transit", "isspecial", "specials", "extcolor", "dealer_discount", "intcolor", "drivetrain",
        "extcolorgeneric", "extcolorhexcode", "int_colorgeneric", "intcolorhexcode", "priority_options"
    ],
    'toyotatheme1': [
        ...srpDefaultIncludeFields,
        "reserve_flag", "status_disclaimer", "available_incentives", "standardbody", "transdescription", "dealer_offer",
        "in_transit", "isspecial", "specials", "extcolor", "dealer_discount", "intcolor", "drivetrain",
        "extcolorgeneric", "extcolorhexcode", "int_colorgeneric", "intcolorhexcode",
    ],
    'toyotatheme2': [
        ...srpDefaultIncludeFields,
        "reserve_flag", "status_disclaimer", "available_incentives", "standardbody", "transdescription", "dealer_offer",
        "in_transit", "isspecial", "specials", "extcolor", "dealer_discount", "intcolor", "drivetrain",
        "extcolorgeneric", "extcolorhexcode", "int_colorgeneric", "intcolorhexcode",
    ],
    'toyotatheme3': [
        ...srpDefaultIncludeFields,
        "reserve_flag", "status_disclaimer", "available_incentives", "standardbody", "transdescription", "dealer_offer",
        "in_transit", "isspecial", "specials", "extcolor", "dealer_discount", "intcolor", "drivetrain",
        "extcolorgeneric", "extcolorhexcode", "int_colorgeneric", "intcolorhexcode", "priority_options"
    ],
    'tristatevans': [
        ...srpDefaultIncludeFields,
        "reserve_flag", "status_disclaimer", "available_incentives", "standardbody", "transdescription", "dealer_offer",
        "in_transit", "isspecial", "specials", "extcolor", "dealer_discount", "intcolor", "drivetrain",
        "extcolorgeneric", "extcolorhexcode", "int_colorgeneric", "intcolorhexcode",
    ],
    'usedcartheme1': [
        ...srpDefaultIncludeFields,
        "reserve_flag", "status_disclaimer", "available_incentives", "standardbody", "transdescription", "dealer_offer",
        "in_transit", "isspecial", "specials", "extcolor", "dealer_discount", "intcolor", "drivetrain",
        "extcolorgeneric", "extcolorhexcode", "int_colorgeneric", "intcolorhexcode",
    ],
    'usedcartheme2': [
        ...srpDefaultIncludeFields,
        "reserve_flag", "status_disclaimer", "available_incentives", "standardbody", "transdescription", "dealer_offer",
        "in_transit", "isspecial", "specials", "extcolor", "dealer_discount", "intcolor", "drivetrain",
        "extcolorgeneric", "extcolorhexcode", "int_colorgeneric", "intcolorhexcode",
    ],
    'wolfe': [
        ...srpDefaultIncludeFields,
        "reserve_flag", "status_disclaimer", "available_incentives", "standardbody", "transdescription", "dealer_offer",
        "in_transit", "isspecial", "specials", "extcolor", "dealer_discount", "intcolor", "drivetrain",
        "extcolorgeneric", "extcolorhexcode", "int_colorgeneric", "intcolorhexcode",
    ],
};

const smartPathFields = ["toyota", "miscprice1"];

export const getIncludeFields = (params: any) => {
    console.log('params', params);
    const { themeName = '', isSmartPathActive = false } = params;
    const includes = srpIncludeFields?.[themeName] || [];

    if (includes.length && isSmartPathActive) {
        const notExistsSmartPathFields = smartPathFields.filter(item => !includes.includes(item));
        includes.push(...notExistsSmartPathFields);
    }

    return JSON.stringify(includes);
}