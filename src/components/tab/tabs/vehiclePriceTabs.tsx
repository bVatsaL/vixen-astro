import React, { useState } from 'react';
import cn from 'classnames';
import { Button } from '@components/button';
import TabNavItem from './tab-nav-item';
import TabContent from './tab-content';
import styles from './styles.scss';

const Tabstesting = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={cn(styles.vehiclePriceTab)}>
      <div className={cn(styles.priceTab)}>
        <TabNavItem
          title={
            <>
              <span>South Fort Price</span>
              <span>$58,578</span>
            </>
          }
          id={0}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          className='tabTitle'
        />
        <TabNavItem
          title={
            <>
              <span>Finance Price</span>
              <span>$364/bw</span>
            </>
          }
          id={1}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          className='tabTitle'
        />
        <TabNavItem
          title={
            <>
              <span>Lease Price</span>
              <span>$347/bw</span>
            </>
          }
          id={2}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          className='tabTitle'
        />
      </div>
      <div className={cn(styles.tabContent)}>
        <TabContent className='priceDetails' id={0} activeTab={activeTab}>
          <span className={styles.southfortPrice}>South Fort Price</span>
          <span className={styles.finalPriceValue}>$58,578</span>
        </TabContent>
        <TabContent id={1} activeTab={activeTab}>
          <table className={styles.priceDetailsTable}>
            <tr>
              <td className={styles.priceTitle}>
                Term<small>(mo.)</small>
              </td>
              <td>
                <div className={styles.d_flex}>
                  <Button className='btn-icon-only priceTableBtn'>36</Button>
                  <Button className='btn-icon-only priceTableBtn'>48</Button>
                  <Button className='btn-icon-only priceTableBtn'>60</Button>
                  <Button className='btn-icon-only priceTableBtn'>72</Button>
                  <Button className='btn-icon-only priceTableBtn isActive'>84</Button>
                </div>
              </td>
            </tr>
            <tr>
              <td className={styles.priceTitle}>Frequency</td>
              <td>
                <div className={cn(styles.d_flex, styles.mt5)}>
                  <Button className='btn-icon-only priceTableBtn isActive'>BiWeekly</Button>
                  <Button className='btn-icon-only priceTableBtn'>Monthly</Button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <span className={cn(styles.priceValue, styles.fontSize20)}>MSRP</span>
              </td>
              <td>
                <div className={cn(styles.priceValue, styles.fontSize20, styles.text_right)}>$58,578</div>
              </td>
            </tr>
          </table>
          <div className={styles.lineDivider} />
          <table className={styles.priceDetailsTable}>
            <tr>
              <td>
                <span className={styles.fontSize20}>South Fort Price</span>
              </td>
              <td>
                <div className={cn(styles.d_flex, styles.fontSize20)}>$58,578</div>
              </td>
            </tr>
          </table>
          <div className={cn(styles.d_flex)}>
            <Button className='btn-icon-only priceTableBtn customizeDealBtn'>Customize my Deal</Button>
          </div>
          <div className={styles.incentivesSummary}>
            <div className={styles.financePercent}>
              <span className={styles.smallText}>Finance For 3.49%</span>
              <span className={styles.totalCost}>$364/bw</span>
            </div>
            <p>
              3.49% APR Financing with $0 down for well qualified buyers on approved credit. Maximum term financing is
              84 months. $13.44 per $1,000 borrowed. Based on Price of $58,578. Estimated payment may exclude estimated
              taxes, tag, title and fees. Security deposit required. Prices include all available qualifying
              rebates/incentives: not all consumers will qualify. Price may not include first month's payment, taxes,
              license, title fees, insurance, and dealer charges. This estimate should be used as a guide, and all
              finance terms must be verified before a sale is complete. Dealer is not responsible for data entry errors.
            </p>
            <p>Offer Expires: 10/31/2022.</p>
          </div>
        </TabContent>
        <TabContent id={2} activeTab={activeTab}>
          <table className={styles.priceDetailsTable}>
            <tr>
              <td className={styles.priceTitle}>
                Term<small>(mo.)</small>
              </td>
              <td>
                <div className={styles.d_flex}>
                  <Button className='btn-icon-only priceTableBtn'>24</Button>
                  <Button className='btn-icon-only priceTableBtn'>36</Button>
                  <Button className='btn-icon-only priceTableBtn isActive'>48</Button>
                </div>
              </td>
            </tr>
            <tr>
              <td className={styles.priceTitle}>Frequency</td>
              <td>
                <div className={cn(styles.d_flex, styles.mt5)}>
                  <Button className='btn-icon-only priceTableBtn isActive'>BiWeekly</Button>
                  <Button className='btn-icon-only priceTableBtn'>Monthly</Button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <span className={cn(styles.priceValue, styles.fontSize20)}>MSRP</span>
              </td>
              <td>
                <div className={cn(styles.priceValue, styles.fontSize20, styles.text_right)}>$58,578</div>
              </td>
            </tr>
          </table>
          <div className={styles.lineDivider} />
          <table className={styles.priceDetailsTable}>
            <tr>
              <td>
                <span className={styles.fontSize20}>South Fort Price</span>
              </td>
              <td>
                <div className={cn(styles.d_flex, styles.fontSize20)}>$58,578</div>
              </td>
            </tr>
          </table>
          <div className={cn(styles.d_flex)}>
            <Button className='btn-icon-only priceTableBtn customizeDealBtn'>Customize my Deal</Button>
          </div>
          <div className={styles.incentivesSummary}>
            <div className={styles.financePercent}>
              <span className={styles.smallText}>Lease For 9.49%</span>
              <span className={styles.totalCost}>$253/bw</span>
            </div>
            <p>
              APR 9.49%. Estimated monthly lease payment based on 48 months, 20,000 kilometers per year, and $0 due at
              signing. Lessee pays for excess wear and tear per kilometer over 20,000 per year. See dealer for complete
              details. Estimated payment may exclude estimated taxes, tag, title and fees. Security deposit required.
              Estimation is based on selling price of $28,788 with down payment of $0 for an adjusted capitalized cost
              of $28,788. Prices include all available qualifying rebates/incentives: not all consumers will qualify.
              Price may not include first month's payment, taxes, license, title fees, insurance, and dealer charges.
              This estimate should be used as a guide, and all lease terms must be verified before a sale is complete.
              Dealer is not responsible for data entry errors. Not all lessees will qualify. Higher lease rates apply
              for lessees with lower credit ratings.
            </p>
            <p>Offer Expires: 10/31/2022.</p>
          </div>
        </TabContent>
      </div>
    </div>
  );
};

export default Tabstesting;
