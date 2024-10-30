import React, { Fragment, useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { RowItem } from "../shared/common/components/RowItem";
import { Input } from "../shared/utils/form/Input";
import { Button } from "../shared/utils/form/Button";
import Form from "../shared/utils/form/Form";
import TextInput from "../shared/utils/form/TextInput";
import TextArea from "@/components/shared/utils/form/TextArea";
import partnerApi from "@/app/apis/partnerApi";
import { getTokenHost } from "@/utils/getTokenAndHost";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "../shared/utils/loading";
import { useToast } from "@/libs/provider/toast-provider";

type Props = {};

export function PartnerSupport({}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl">파트너제휴</h2>

      <p className="text-sm text-gray-200">
        본사에서는 모든 지원을 약속하고 국내 최고의 카지노 운영 노하우를 통한
        최고의 수익을 보장합니다.
        <br />
        굳은 신뢰관계를 통해 최고의 수익을 원하시는 파트너 모집을 정중히
        요청합니다.
      </p>
      <h3 className="text-lg">파트너 모집대상 </h3>
      <div className="text-xs text-gray-200">
        - 국내 또는 해외카지노 에이전트로 일정수의 고객을 보유하고 있으신 분
        <br />
        - 개인유저로써 주위의 지인들과 함께 그룹으로 카지노게임을 즐기시는 분.
        <br />
        - 성인PC방 또는 성인사이트 운영자.
        <br />
        - 카지노 관련 동호회, 사이트, 블로그, 카페운영자.
        <br />
        - 온라인포털 광고를 전문적으로 하시는 분.
        <br />- 대량 SMS문자발송을 전문으로 하시는 분.
      </div>
      <h3 className="text-lg">파트너상담신청하기 </h3>
      <RegisterPartnerForm />
    </div>
  );
}

function RegisterPartnerForm() {
  const methods = useForm();
  const params = useSearchParams();
  const router = useRouter();
  const tag = params.get("tag");
  const { token, host } = getTokenHost();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const obSubmitJoinMember = async (data: any) => {
    setIsLoading(true);

    try {
      const { number1, number2, number3 } = data;
      const contract = number1 + number2 + number3;
      const res = await partnerApi.registerPartner({
        token: token as string,
        host: host,
        content: content,
        contract: contract,
      });
      if (res?.data?.status == 0) {
        toast.success(
          "파트너 상담이 접수되었습니다! 담당자 확인 후 연락드리겠습니다.",
          `파트너상담연락처 : ${res?.data?.PARTNER_TEL_01}`
        );
        methods.reset()
        router.push("/");
        router.refresh()
      }
    } catch (err) {
      console.log("register partner failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (tag === "partner") {
        const res = await partnerApi.checkPartner({
          token: token as string,
          host: host,
        });

        if (res?.data?.PARTER_ADD_YN != "Y") {
          router.push("/");
        }
      }
    })();
  }, [tag, token]);

  return (
    <>
      <Form
        className="flex flex-col items-center gap-5 "
        onSubmit={obSubmitJoinMember}
      >
        <div className="w-full rounded shadow-lg bg-primary p-7">
          <RowItem label="문의내용">
            <Fragment>
              <TextArea
                value={content}
                handleChange={setContent}
                row={5}
                maxLength={480}
              />

              <p className="mt-1 text-xs text-gray-400">
                ({content?.length} / 최대 480자)
                <br /> 활동지역/본 사이트를 알게 된 경위/과거 카지노 파트너관련
                경험 여부/주된 광고방법(오프라인,문자,웹카페 및 블로그 광고
                등)/궁금하신 점 (파트너운영방식, 수수료율, 기타 내용 등…) 위의
                사항을 형식에 관계없이 간단히 기술해주시면 됩니다.
              </p>
              {content?.length > 480 ? (
                <p className="text-sm text-red-700">문의내용 480자 이내</p>
              ) : (
                <></>
              )}
            </Fragment>
          </RowItem>
          <RowItem label="휴대폰번호" className="lg:mb-0">
            <div className="flex flex-row items-center justify-start gap-2">
              <Input
                placeholder=""
                type="text"
                name="number1"
                style={{
                  width: "100%",
                }}
                maxLength={3}
                required
              />
              <span>-</span>
              <Input
                placeholder=""
                type="text"
                name="number2"
                style={{
                  width: "100%",
                }}
                maxLength={4}
                required
              />
              <span>-</span>

              <Input
                placeholder=""
                type="text"
                name="number3"
                style={{
                  width: "100%",
                }}
                maxLength={4}
                required
              />
            </div>

            <p className="mt-1 text-xs text-gray-400">
              * 연락받으실 휴대폰 번호를 입력하세요.
            </p>
          </RowItem>
        </div>
        <Button
          text="신청하기"
          className={
            "mx-auto  w-full flex-row justify-center  border-none bg-warning px-3 py-2 text-center !text-primary lg:w-[400px]"
          }
          onClick={() => console.log("submit")}
        />
      </Form>
      <Loading isLoading={isLoading} onClose={() => setIsLoading(false)} />
    </>
  );
}
