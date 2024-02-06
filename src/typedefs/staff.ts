export type Staff = {
  title: string;
  data: StaffDetails[];
};

export type StaffDetails = {
  email: string;
  job_title: string;
  phone: string;
  staff_language: string;
  staff_hometown: string;
  staff__info__status: string;
  staff__info__isPrimary: boolean;
  staff_image: {
    media_library: {
      src: string;
    };
  };
  staff_name: string;
  more_info: string;
  second_title?: string;
};
