// ✅ Business Plan Type (Parent of Sections)
export type BusinessPlan = {
    id: string; // TEXT primary key
    name: string;
    version: string;
    created: string; // ISO timestamp
    updated: string;
    expand?: {
        sections?: Section[]; // Expands to include related sections
    };
};

// ✅ Section Type (Child of BusinessPlan, Parent of Subsections)
export type Section = {
    id: string;
    business_plan: string; // Foreign key reference to BusinessPlan (TEXT)
    created: string;
    order: number;
    title: string;
    updated: string;
    expand?: {
        subsections?: Subsection[]; // Expands to include related subsections
    };
};

// ✅ Subsection Type (Child of Section)
export type Subsection = {
    id: string;
    section: string; // Foreign key reference to Section (TEXT)
    created: string;
    order: number;
    title: string;
    content: string;
    updated: string;
};

// ✅ Expanded Types for Relations
export type BusinessPlanWithSections = BusinessPlan & {
    expand: {
        sections: SectionWithSubsections[];
    };
};

export type SectionWithSubsections = Section & {
    expand?: {
        subsections?: Subsection[];
    };
};
