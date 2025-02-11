// Business Plan Types
export type BusinessPlan = {
    id: string;
    name: string;
    version: string;
    created: string;
    updated: string;
    expand?: {
        sections?: Section[];
    };
};

export type Section = {
    id: string;
    business_plan: string;
    created: string;
    order: number;
    title: string;
    updated: string;
    expand?: {
        subsections?: Subsection[];
    };
};

export type Subsection = {
    id: string;
    section: string;
    created: string;
    order: number;
    title: string;
    content: string;
    updated: string;
};

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

// Staff and User Types
export interface ExecutiveStaff {
    id: string;
    name: string;
    role: string;
    email: string;
    bio?: string;
    title: string;
    avatar?: string;
    expand?: {
        avatar?: {
            collectionId: string;
            id: string;
            image: string;
        };
    };
}

export interface Pro {
    id: string;
    name: string;
    rank: number;
    country: string;
    bio?: string;
    expand: {
        flag?: {
            collectionId: string;
            id: string;
            flag_image: string;
        };
        avatar?: {
            collectionId: string;
            id: string;
            image: string;
        };
    };
}

export interface Partner {
    id: string;
    name: string;
    type: string;
    expand?: {
        avatar?: {
            collectionId: string;
            id: string;
            image: string;
        };
    };
}
